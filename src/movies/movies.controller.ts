import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ROLES } from 'src/auth/enum/roles';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  async findAll() {
    return await this.moviesService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(ROLES.REGULAR)
  findOne(@Param('id') id: string) {
    return this.moviesService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles(ROLES.ADMIN)
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(ROLES.ADMIN)
  update(@Param('id') id: string, @Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.update(id, createMovieDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(ROLES.ADMIN)
  remove(@Param('id') id: string) {
    return this.moviesService.remove(id);
  }
}
