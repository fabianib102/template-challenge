import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MoviesService } from '../movies.service';
import { Movie } from '../schema/movie.schema';
import { CreateMovieDto } from '../dto/create-movie.dto';

const mockMovie = {
  title: 'Test Movie',
  plot: 'Test Plot',
  year: 2021,
};

const mockMovieModel = {
  find: jest.fn().mockResolvedValue([mockMovie]),
  findById: jest.fn().mockResolvedValue(mockMovie),
  create: jest.fn().mockResolvedValue(mockMovie),
  updateOne: jest.fn().mockResolvedValue({ n: 1, nModified: 1, ok: 1 }),
  deleteOne: jest.fn().mockResolvedValue({ n: 1, ok: 1, deletedCount: 1 }),
};

describe('MoviesService', () => {
    let service: MoviesService;
    let model: Model<Movie>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
          providers: [
            MoviesService,
            {
              provide: getModelToken(Movie.name),
              useValue: mockMovieModel,
            },
          ],
        }).compile();
    
        service = module.get<MoviesService>(MoviesService);
        model = module.get<Model<Movie>>(getModelToken(Movie.name));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('findAll', () => {
        it('should return an array of movies', async () => {
          const result = await service.findAll();
          expect(result).toEqual([mockMovie]);
          expect(model.find).toHaveBeenCalled();
        });
    });

    describe('findOne', () => {
        it('should return a single movie', async () => {
          const result = await service.findOne('1');
          expect(result).toEqual(mockMovie);
          expect(model.findById).toHaveBeenCalledWith('1');
        });
    });

    describe('create', () => {
        it('should create a new movie', async () => {
          const createMovieDto: CreateMovieDto = {
            title: 'New Movie',
            plot: 'New Description',
            year: 2022,
          };
          const result = await service.create(createMovieDto);
          expect(result).toEqual(true);
          expect(model.create).toHaveBeenCalledWith(createMovieDto);
        });
    });

    describe('update', () => {
        it('should update a movie', async () => {
          const updateMovieDto: CreateMovieDto = {
            title: 'Updated Movie',
            plot: 'Plot Description',
            year: 2023,
          };
          const result = await service.update('1', updateMovieDto);
          expect(result).toEqual(true);
          expect(model.updateOne).toHaveBeenCalledWith({ _id: '1' }, updateMovieDto);
        });
    });

    describe('remove', () => {
        it('should delete a movie', async () => {
          const result = await service.remove('1');
          expect(result).toEqual(true);
          expect(model.deleteOne).toHaveBeenCalledWith({ _id: '1' });
        });
    });

})