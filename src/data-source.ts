import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'popcorn-palace',
  password: 'popcorn-palace',
  database: 'popcorn-palace',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,   // Disable in production!
  logging: true,
});
