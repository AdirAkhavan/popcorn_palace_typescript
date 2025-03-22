import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
  ) {}

  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    const movie = this.movieRepository.create(createMovieDto);
    return this.movieRepository.save(movie);
  }

  async findAll(): Promise<Movie[]> {
    return this.movieRepository.find();
  }

  async findOne(id: number): Promise<Movie> {
    return this.movieRepository.findOneBy({id});
  }

  async update(id: number, updateMovieDto: UpdateMovieDto): Promise<Movie> {
    await this.movieRepository.update(id, updateMovieDto);
    return this.movieRepository.findOneBy({id});
  }

  async remove(id: number): Promise<void> {
    await this.movieRepository.delete(id);
  }
}
