import { IsString, IsInt, Min, Max } from 'class-validator';

export class CreateTheaterDto {
  @IsString()
  name: string;

  @IsInt()
  @Min(1)
  @Max(10000)
  capacity: number;
}