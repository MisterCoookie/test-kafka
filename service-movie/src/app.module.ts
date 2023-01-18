import { Module } from '@nestjs/common';
import {MovieModule} from "./movies/movie.module";
import {DatabaseModule} from "./databases/database.module";

@Module({
  imports: [DatabaseModule, MovieModule],
})
export class AppModule {}
