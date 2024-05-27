import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MoviesModule,
    MongooseModule.forRoot('mongodb+srv://usermongo:bqgZZHBQmXqLnAm5@cluster0.xpas1ok.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
