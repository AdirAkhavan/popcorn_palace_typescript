import { DataSource } from 'typeorm';
import { Movie } from './movies/entities/movie.entity';  // Import your entities here

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'popcorn-palace',
  password: 'popcorn-palace',
  database: 'popcorn-palace',
  entities: [Movie],
  synchronize: true,   // Disable in production!
  logging: true,
});
