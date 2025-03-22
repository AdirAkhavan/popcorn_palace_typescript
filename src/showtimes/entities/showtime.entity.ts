import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Movie } from 'src/movies/entities/movie.entity';
import { Theater } from 'src/theaters/entities/theater.entity';
import { IsDateString, IsNumber, IsPositive } from 'class-validator';

@Entity()
export class Showtime {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Movie, { eager: true })
  @JoinColumn({ name: 'movie_id' })
  movie: Movie;

  @ManyToOne(() => Theater, { eager: true })
  @JoinColumn({ name: 'theater_id' })
  theater: Theater;

  @Column()
  @IsDateString()
  start_time: string;

  @Column()
  @IsDateString()
  end_time: string;

  @Column()
  @IsNumber()
  @IsPositive()
  price: number;
}
