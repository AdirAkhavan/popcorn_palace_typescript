import { IsString, IsInt, IsOptional, IsPositive, Min, Max, IsNumber } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  title: string;

  @IsString()
  genre: string;

  @IsInt()
  @IsPositive()
  duration: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Min(1)
  @Max(5)
  rating: number;

  @IsInt()
  @IsPositive()
  releaseYear: number;
}
