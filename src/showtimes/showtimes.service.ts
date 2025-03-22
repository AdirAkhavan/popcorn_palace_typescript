// src/showtimes/showtimes.service.ts

import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Showtime } from './entities/showtime.entity';
import { CreateShowtimeDto } from './dto/create-showtime.dto';
import { UpdateShowtimeDto } from './dto/update-showtime.dto';
import { Theater } from 'src/theaters/entities/theater.entity';
import { Movie } from 'src/movies/entities/movie.entity';

@Injectable()
export class ShowtimesService {
  constructor(
    @InjectRepository(Showtime)
    private readonly showtimeRepository: Repository<Showtime>,
    @InjectRepository(Theater)
    private readonly theaterRepository: Repository<Theater>,
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  private async checkForOverlappingShowtimes(
    theaterId: string,
    start_time: string,
    end_time: string,
  ): Promise<boolean> {
    const overlappingShowtimes = await this.showtimeRepository
      .createQueryBuilder('showtime')
      .where('showtime.theater_id = :theaterId', { theaterId })
      .andWhere('showtime.start_time < :end_time', { end_time })
      .andWhere('showtime.end_time > :start_time', { start_time })
      .getMany();

    return overlappingShowtimes.length > 0;
  }

  async create(createShowtimeDto: CreateShowtimeDto): Promise<Showtime> {
    const { movie_id, theater_id, start_time, end_time, price } = createShowtimeDto;
  
    // Check if the theater exists
    const theater = await this.theaterRepository.findOne({ where: { id: theater_id } });
    if (!theater) {
      throw new NotFoundException('Theater not found');
    }
  
    // Check if the movie exists
    const movie = await this.movieRepository.findOne({ where: { id: movie_id } });
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }
  
    // Check for overlapping showtimes for the same theater
    const hasOverlap = await this.checkForOverlappingShowtimes(theater_id, start_time, end_time);
    if (hasOverlap) {
      throw new ConflictException('There is already an overlapping showtime in this theater');
    }
  
    // Create the showtime using the actual movie and theater entities
    const showtime = this.showtimeRepository.create({
      movie,
      theater,
      start_time,
      end_time,
      price,
    });
  
    // Save and return the created showtime
    return this.showtimeRepository.save(showtime);
  }  

  async findAll(): Promise<Showtime[]> {
    return this.showtimeRepository.find();
  }

  async findOne(id: string): Promise<Showtime> {
    const showtime = await this.showtimeRepository.findOne({ where: { id } });
    if (!showtime) {
      throw new NotFoundException('Showtime not found');
    }
    return showtime;
  }

  async update(id: string, updateShowtimeDto: UpdateShowtimeDto): Promise<Showtime> {
    const showtime = await this.findOne(id);

    // Check if there's an overlap for the updated showtime
    const { theater_id, start_time, end_time } = updateShowtimeDto;
    const hasOverlap = await this.checkForOverlappingShowtimes(theater_id, start_time, end_time);
    if (hasOverlap) {
      throw new ConflictException('There is already an overlapping showtime in this theater');
    }

    // Update the showtime fields
    Object.assign(showtime, updateShowtimeDto);

    return this.showtimeRepository.save(showtime);
  }

  async remove(id: string): Promise<void> {
    const showtime = await this.findOne(id);
    await this.showtimeRepository.remove(showtime);
  }
}
