import { IsDateString, IsInt, IsNumber, IsPositive, IsString, IsUUID } from 'class-validator';

export class CreateShowtimeDto {
  @IsUUID()
  movie_id: string;

  @IsUUID()
  theater_id: string;

  @IsDateString()
  start_time: string;

  @IsDateString()
  end_time: string;

  @IsNumber()
  @IsPositive()
  price: number;
}
