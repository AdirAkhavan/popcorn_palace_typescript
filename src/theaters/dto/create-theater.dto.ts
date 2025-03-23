import { IsString, IsInt, IsPositive } from 'class-validator';

export class CreateTheaterDto {
  @IsString()
  name: string;

  @IsInt()
  @IsPositive()
  capacity: number;
}
