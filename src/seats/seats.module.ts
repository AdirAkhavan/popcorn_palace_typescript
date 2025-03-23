import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeatsService } from './seats.service';
import { SeatsController } from './seats.controller';
import { Seat } from './entities/seat.entity';
import { Showtime } from 'src/showtimes/entities/showtime.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Seat, Showtime]),
  ],
  controllers: [SeatsController],
  providers: [SeatsService],
})
export class SeatsModule {}
