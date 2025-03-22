import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

describe('MoviesService', () => {
  let service: MoviesService;
  let movieRepository: Repository<Movie>;

  const mockMovieRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        {
          provide: getRepositoryToken(Movie),
          useValue: mockMovieRepository,
        },
      ],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
    movieRepository = module.get<Repository<Movie>>(getRepositoryToken(Movie));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
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

      mockMovieRepository.create.mockReturnValue(createdMovie);
      mockMovieRepository.save.mockResolvedValue(createdMovie);

      const result = await service.create(createMovieDto);
      expect(result).toEqual(createdMovie);
      expect(mockMovieRepository.create).toHaveBeenCalledWith(createMovieDto);
      expect(mockMovieRepository.save).toHaveBeenCalledWith(createdMovie);
    });
  });

  describe('findAll', () => {
    it('should return an array of movies', async () => {
      const movies = [
        { id: 1, title: 'Inception', genre: 'Sci-Fi', duration: 148, rating: 5, releaseYear: 2010 },
        { id: 2, title: 'The Dark Knight', genre: 'Action', duration: 152, rating: 4, releaseYear: 2008 },
      ];

      mockMovieRepository.find.mockResolvedValue(movies);

      const result = await service.findAll();
      expect(result).toEqual(movies);
      expect(mockMovieRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single movie by id', async () => {
      const movie = { id: 1, title: 'Inception', genre: 'Sci-Fi', duration: 148, rating: 5, releaseYear: 2010 };
      
      mockMovieRepository.findOneBy.mockResolvedValue(movie);

      const result = await service.findOne(1);
      expect(result).toEqual(movie);
      expect(mockMovieRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
    });
  });

  describe('update', () => {
    it('should update an existing movie', async () => {
      const updateMovieDto: UpdateMovieDto = {
        title: 'Inception Updated',
      };

      const updatedMovie = { id: 1, title: 'Inception Updated', genre: 'Sci-Fi', duration: 148, rating: 5, releaseYear: 2010 };

      mockMovieRepository.update.mockResolvedValue(undefined); // Simulate no return value from update
      mockMovieRepository.findOneBy.mockResolvedValue(updatedMovie);

      const result = await service.update(1, updateMovieDto);
      expect(result).toEqual(updatedMovie);
      expect(mockMovieRepository.update).toHaveBeenCalledWith(1, updateMovieDto);
      expect(mockMovieRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
    });
  });

  describe('remove', () => {
    it('should delete a movie by id', async () => {
      const movieId = 1;

      mockMovieRepository.delete.mockResolvedValue(undefined); // Simulate successful delete

      await service.remove(movieId);
      expect(mockMovieRepository.delete).toHaveBeenCalledWith(movieId);
    });
  });
});
