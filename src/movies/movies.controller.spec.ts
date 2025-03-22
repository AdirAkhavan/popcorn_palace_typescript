import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

const mockMoviesService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('MoviesController', () => {
  let controller: MoviesController;
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [
        {
          provide: MoviesService,
          useValue: mockMoviesService,
        },
      ],
    }).compile();

    controller = module.get<MoviesController>(MoviesController);
    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new movie', async () => {
      const createMovieDto: CreateMovieDto = {
        title: 'Inception',
        genre: 'Sci-Fi',
        duration: 148,
        rating: 5,
        releaseYear: 2010,
      };

      const createdMovie = { ...createMovieDto, id: 1 };
      mockMoviesService.create.mockResolvedValue(createdMovie);

      const result = await controller.create(createMovieDto);
      expect(result).toEqual(createdMovie);
      expect(mockMoviesService.create).toHaveBeenCalledWith(createMovieDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of movies', async () => {
      const movies = [
        { id: 1, title: 'Inception', genre: 'Sci-Fi', duration: 148, rating: 5, releaseYear: 2010 },
        { id: 2, title: 'The Dark Knight', genre: 'Action', duration: 152, rating: 4, releaseYear: 2008 },
      ];
      
      mockMoviesService.findAll.mockResolvedValue(movies);

      const result = await controller.findAll();
      expect(result).toEqual(movies);
      expect(mockMoviesService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a movie by id', async () => {
      const movie = { id: 1, title: 'Inception', genre: 'Sci-Fi', duration: 148, rating: 5, releaseYear: 2010 };

      mockMoviesService.findOne.mockResolvedValue(movie);

      const result = await controller.findOne(1);
      expect(result).toEqual(movie);
      expect(mockMoviesService.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update a movie', async () => {
      const updateMovieDto: UpdateMovieDto = { title: 'Inception Updated' };
      const updatedMovie = { id: 1, title: 'Inception Updated', genre: 'Sci-Fi', duration: 148, rating: 5, releaseYear: 2010 };

      mockMoviesService.update.mockResolvedValue(updatedMovie);

      const result = await controller.update(1, updateMovieDto);
      expect(result).toEqual(updatedMovie);
      expect(mockMoviesService.update).toHaveBeenCalledWith(1, updateMovieDto);
    });
  });

  describe('remove', () => {
    it('should remove a movie', async () => {
      const movieId = 1;

      mockMoviesService.remove.mockResolvedValue(undefined);

      await controller.remove(movieId);
      expect(mockMoviesService.remove).toHaveBeenCalledWith(movieId);
    });
  });
});
