import { IsDateString, IsInt, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateShowtimeDto {
  @IsInt()
  movie_id: number;

  @IsString()
  theater_id: string;

  @IsDateString()
  start_time: string;

  @IsDateString()
  end_time: string;

  @IsNumber()
  @IsPositive()
  price: number;
}
