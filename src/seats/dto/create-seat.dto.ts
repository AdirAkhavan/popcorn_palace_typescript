import { IsString, IsUUID } from 'class-validator';

export class CreateSeatDto {
  @IsUUID()
  showtime_id: string;

  @IsString()
  seat_number: string;
}
