// src/seats/seats.controller.ts

import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { SeatsService } from './seats.service';
import { CreateSeatDto } from './dto/create-seat.dto';
import { Seat } from './entities/seat.entity';

@Controller('seats')
export class SeatsController {
  constructor(private readonly seatsService: SeatsService) {}

  // Create a seat for a showtime
  @Post()
  async create(@Body() createSeatDto: CreateSeatDto): Promise<Seat> {
    return this.seatsService.create(createSeatDto);
  }

  // Get all seats for a showtime
  @Get('showtime/:showtimeId')
  async findAllByShowtime(@Param('showtimeId') showtimeId: string): Promise<Seat[]> {
    return this.seatsService.findAllByShowtime(showtimeId);
  }

  // Book a specific seat
  @Put(':seatId/book')
  async book(@Param('seatId') seatId: string, @Body('customerId') customerId: string): Promise<Seat> {
    return this.seatsService.bookSeat(seatId, customerId);
  }

  // Cancel a seat booking
  @Put(':seatId/cancel')
  async cancel(@Param('seatId') seatId: string): Promise<Seat> {
    return this.seatsService.cancelBooking(seatId);
  }
}
