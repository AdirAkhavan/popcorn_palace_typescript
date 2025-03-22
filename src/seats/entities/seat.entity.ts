import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Showtime } from 'src/showtimes/entities/showtime.entity';

@Entity()
export class Seat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Showtime, (showtime) => showtime.id, { eager: true })
  @JoinColumn({ name: 'showtime_id' })
  showtime: Showtime;

  @Column()
  seat_number: string;

  @Column({ default: false })
  booked: boolean;

  @Column({ nullable: true })
  customer_id: string; // Optional, track customer ID for the booking (e.g., user ID)
}
