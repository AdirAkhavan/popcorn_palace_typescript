// src/theaters/theaters.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Theater } from './entities/theater.entity';
import { CreateTheaterDto } from './dto/create-theater.dto';
import { UpdateTheaterDto } from './dto/update-theater.dto';

@Injectable()
export class TheatersService {
  constructor(
    @InjectRepository(Theater)
    private readonly theaterRepository: Repository<Theater>,
  ) {}

  async create(createTheaterDto: CreateTheaterDto): Promise<Theater> {
    const theater = this.theaterRepository.create(createTheaterDto);
    return this.theaterRepository.save(theater);
  }

  async findAll(): Promise<Theater[]> {
    return this.theaterRepository.find();
  }

  async findOne(id: string): Promise<Theater> {
    const theater = await this.theaterRepository.findOne({ where: { id } });
    if (!theater) {
      throw new NotFoundException('Theater not found');
    }
    return theater;
  }

  async update(id: string, updateTheaterDto: UpdateTheaterDto): Promise<Theater> {
    const theater = await this.findOne(id);
    Object.assign(theater, updateTheaterDto);
    return this.theaterRepository.save(theater);
  }

  async remove(id: string): Promise<void> {
    const theater = await this.findOne(id);
    await this.theaterRepository.remove(theater);
  }
}
