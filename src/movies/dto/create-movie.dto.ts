import { IsString, IsInt, IsPositive, Min, Max, IsNumber } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  title: string;

  @IsString()
  genre: string;

  @IsInt()
  @IsPositive()
  duration: number;

  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @IsInt()
  @IsPositive()
  @Min(1888)
  release_year: number;
}
