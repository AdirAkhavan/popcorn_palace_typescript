import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesModule } from './movies/movies.module';
import { AppDataSource } from './data-source';
import { ShowtimesModule } from './showtimes/showtimes.module';
import { TheatersModule } from './theaters/theaters.module';
import { SeatsModule } from './seats/seats.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource.options),
    MoviesModule,
    ShowtimesModule,
    TheatersModule,
    SeatsModule,
  ],
})
export class AppModule {}
