import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { Movie } from './../src/movies/entities/movie.entity';
import { DataSource } from 'typeorm';

describe('MoviesController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    dataSource = moduleFixture.get<DataSource>(DataSource);
    await app.init();
  });

  afterAll(async () => {
    await dataSource.getRepository(Movie).delete({});
    await app.close();
  });

  it('should create a new movie (POST /movies)', async () => {
    const createMovieDto = {
      title: 'Inception',
      genre: 'Sci-Fi',
      duration: 148,
      rating: 4.5,
      releaseYear: 2010,
    };

    const response = await request(app.getHttpServer())
      .post('/movies')
      .send(createMovieDto)
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.title).toBe(createMovieDto.title);
    expect(response.body.genre).toBe(createMovieDto.genre);
    expect(response.body.duration).toBe(createMovieDto.duration);
    expect(response.body.rating).toBe(createMovieDto.rating);
    expect(response.body.releaseYear).toBe(createMovieDto.releaseYear);
  });

  it('should return a 400 error if rating is less than 1 (POST /movies)', async () => {
    const createMovieDto = {
      title: 'Inception',
      genre: 'Sci-Fi',
      duration: 148,
      rating: 0,  // Invalid rating
      releaseYear: 2010,
    };

    const response = await request(app.getHttpServer())
      .post('/movies')
      .send(createMovieDto)
      .expect(400);

    expect(response.body.message).toContain('rating must be greater than or equal to 1');
  });

  it('should return a 400 error if rating is greater than 5 (POST /movies)', async () => {
    const createMovieDto = {
      title: 'Inception',
      genre: 'Sci-Fi',
      duration: 148,
      rating: 6,  // Invalid rating
      releaseYear: 2010,
    };

    const response = await request(app.getHttpServer())
      .post('/movies')
      .send(createMovieDto)
      .expect(400);

    expect(response.body.message).toContain('rating must be less than or equal to 5');
  });

  it('should update a movie (PUT /movies/:id)', async () => {
    const createMovieDto = {
      title: 'Interstellar',
      genre: 'Sci-Fi',
      duration: 169,
      rating: 4.7,
      releaseYear: 2014,
    };

    const createResponse = await request(app.getHttpServer())
      .post('/movies')
      .send(createMovieDto)
      .expect(201);

    const movieId = createResponse.body.id;
    const updateMovieDto = { title: 'Interstellar Updated', rating: 4.9 };

    const updateResponse = await request(app.getHttpServer())
      .put(`/movies/${movieId}`)
      .send(updateMovieDto)
      .expect(200);

    expect(updateResponse.body).toHaveProperty('id', movieId);
    expect(updateResponse.body.title).toBe(updateMovieDto.title);
    expect(updateResponse.body.rating).toBe(updateMovieDto.rating);
  });

  it('should return a 400 error if rating is invalid on update (PUT /movies/:id)', async () => {
    const createMovieDto = {
      title: 'Memento',
      genre: 'Thriller',
      duration: 113,
      rating: 4.2,
      releaseYear: 2000,
    };

    const createResponse = await request(app.getHttpServer())
      .post('/movies')
      .send(createMovieDto)
      .expect(201);

    const movieId = createResponse.body.id;
    const updateMovieDto = { rating: 6 };  // Invalid rating

    const updateResponse = await request(app.getHttpServer())
      .put(`/movies/${movieId}`)
      .send(updateMovieDto)
      .expect(400);

    expect(updateResponse.body.message).toContain('rating must be less than or equal to 5');
  });

  it('should delete a movie (DELETE /movies/:id)', async () => {
    const createMovieDto = {
      title: 'Memento',
      genre: 'Thriller',
      duration: 113,
      rating: 4.2,
      releaseYear: 2000,
    };

    const createResponse = await request(app.getHttpServer())
      .post('/movies')
      .send(createMovieDto)
      .expect(201);

    const movieId = createResponse.body.id;

    const deleteResponse = await request(app.getHttpServer())
      .delete(`/movies/${movieId}`)
      .expect(200);

    const getResponse = await request(app.getHttpServer())
      .get(`/movies/${movieId}`)
      .expect(404);
  });
});
