import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Movie } from './schema/movie.schema';


@Injectable()
export class MoviesService {
  constructor(@InjectModel(Movie.name) private movieModel: Model<Movie>) {}

  findAll() {
    try {
      const list = this.movieModel.find()
      return list;
    } catch (error) {
      console.log(error)
    }
  }

  findOne(id: string) {
    try {
      const movieResult = this.movieModel.findById(id);
      return movieResult
    } catch (error) {
      console.log(error)
    }
  }

  create(createMovieDto: CreateMovieDto) {
    try {
      this.movieModel.create(createMovieDto)
      return true
    } catch (error) {
      console.log(error)
    }
  }

  async update(id: string, createMovieDto: CreateMovieDto) {
    try {
      await this.movieModel.updateOne({_id: id,}, createMovieDto)
      return true
    } catch (error) {
      console.log(error)
    }
  }

  async remove(id: string) {
    try {
      await this.movieModel.deleteOne({_id: id,})
      return true
    } catch (error) {
      console.log(error)
    }
  }
}
