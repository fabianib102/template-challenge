import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from '../movies.controller';
import { MoviesService } from '../movies.service';
import { JwtAuthGuard } from '../../../src/auth/guards/jwt-auth.guard';
import { ROLES } from 'src/auth/enum/roles';
import { CreateMovieDto } from '../dto/create-movie.dto';

const mockMoviesService = {
    findAll: jest.fn().mockResolvedValue(['test movie']),
    findOne: jest.fn().mockResolvedValue('test movie'),
    create: jest.fn().mockResolvedValue(true),
    update: jest.fn().mockResolvedValue(true),
    remove: jest.fn().mockResolvedValue(true),
};

const mockJwtAuthGuard = {
    canActivate: jest.fn(() => true),
};
  
const mockRolesGuard = {
    canActivate: jest.fn(() => true),
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
        })
          .overrideGuard(JwtAuthGuard)
          .useValue(mockJwtAuthGuard)
          .compile();
    
        controller = module.get<MoviesController>(MoviesController);
        service = module.get<MoviesService>(MoviesService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('findAll', () => {
        it('should return an array of movies', async () => {
          const result = await controller.findAll();
          expect(result).toEqual(['test movie']);
          expect(service.findAll).toHaveBeenCalled();
        });
    });

    describe('findOne', () => {
        it('should return a single movie', async () => {
          const result = await controller.findOne('1');
          expect(result).toEqual('test movie');
          expect(service.findOne).toHaveBeenCalledWith('1');
        });
    });

    describe('create', () => {
        it('should create a new movie', async () => {
          const createMovieDto: CreateMovieDto = {
            title: 'New Movie',
            plot: 'New Description',
            year: 2022,
          };
          const result = await controller.create(createMovieDto);
          expect(result).toEqual(true);
          expect(service.create).toHaveBeenCalledWith(createMovieDto);
        });
    });

    describe('update', () => {
        it('should update a movie', async () => {
          const updateMovieDto: CreateMovieDto = {
            title: 'Updated Movie',
            plot: 'Updated Description',
            year: 2023,
          };
          const result = await controller.update('1', updateMovieDto);
          expect(result).toEqual(true);
          expect(service.update).toHaveBeenCalledWith('1', updateMovieDto);
        });
    });

    describe('remove', () => {
        it('should delete a movie', async () => {
          const result = await controller.remove('1');
          expect(result).toEqual(true);
          expect(service.remove).toHaveBeenCalledWith('1');
        });
    });
})