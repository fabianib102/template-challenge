import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MoviesModule,
    MongooseModule.forRoot(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xpas1ok.mongodb.net/?retryWrites=true&w=majority&appName=${process.env.DB_APPNAME}`)
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
