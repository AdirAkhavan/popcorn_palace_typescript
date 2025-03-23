import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seat } from './entities/seat.entity';
import { Showtime } from 'src/showtimes/entities/showtime.entity';
import { CreateSeatDto } from './dto/create-seat.dto';

@Injectable()
export class SeatsService {
  constructor(
    @InjectRepository(Seat)
    private readonly seatRepository: Repository<Seat>,
    
    @InjectRepository(Showtime) // Inject Showtime repository
    private readonly showtimeRepository: Repository<Showtime>,
  ) {}

  // Create seats for a specific showtime
  async create(createSeatDto: CreateSeatDto): Promise<Seat> {
    // Retrieve the Showtime entity from the database using showtime_id
    const showtime = await this.showtimeRepository.findOne({
      where: { id: createSeatDto.showtime_id },
    });
    
    
    // If no showtime is found, throw an exception
    if (!showtime) {
      throw new NotFoundException('Showtime not found');
    }

    // Create the seat and assign the showtime entity
    const seat = this.seatRepository.create({
      ...createSeatDto,
      showtime,  // Assign the showtime entity
    });

    // Save and return the seat
    return this.seatRepository.save(seat);
  }

  // Find all seats for a specific showtime, including the showtime relation
  async findAllByShowtime(showtimeId: string): Promise<Seat[]> {
    return this.seatRepository.find({
      where: { showtime: { id: showtimeId } },
      relations: ['showtime'], // Include the showtime relation in the response
    });
  }

  // Find a seat by ID
  async findOne(id: string): Promise<Seat> {
    const seat = await this.seatRepository.findOne({ where: { id }, relations: ['showtime'] }); // Include the showtime relation
    if (!seat) {
      throw new NotFoundException('Seat not found');
    }
    return seat;
  }

  // Check if a seat is already booked for a showtime
  async checkSeatAvailability(showtimeId: string, seatNumber: string): Promise<boolean> {
    const seat = await this.seatRepository.findOne({
      where: { showtime: { id: showtimeId }, seat_number: seatNumber },
    });
    return seat ? !seat.booked : true;
  }

  // Book a seat for a showtime
  async bookSeat(seatId: string, customerId: string): Promise<Seat> {
    const seat = await this.findOne(seatId);
    
    // Ensure the seat isn't already booked
    if (seat.booked) {
      throw new ConflictException('This seat has already been booked.');
    }

    // Mark the seat as booked and assign the customer
    seat.booked = true;
    seat.customer_id = customerId;
    return this.seatRepository.save(seat);
  }

  // Cancel a seat booking
  async cancelBooking(seatId: string): Promise<Seat> {
    const seat = await this.findOne(seatId);
    
    // Ensure the seat is already booked before canceling
    if (!seat.booked) {
      throw new ConflictException('This seat is not booked.');
    }

    // Cancel the booking
    seat.booked = false;
    seat.customer_id = null;
    return this.seatRepository.save(seat);
  }
}
