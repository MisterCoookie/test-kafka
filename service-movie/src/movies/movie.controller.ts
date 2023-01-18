import {Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put} from "@nestjs/common";
import {MovieService} from "./movie.service";
import {MovieMutationDto} from "./movie.dto";

@Controller('movies')
export class MovieController {
  constructor(private movieService: MovieService) {}

  @Get()
  list() {
    return this.movieService.list()
  }
  @Post()
  create(
    @Body() movieData: MovieMutationDto
  ) {
    return this.movieService.create(movieData)
  }
  @Get('/:movieId')
  getOne(
    @Param('movieId', ParseUUIDPipe) movieId: string
  ) {
    return this.movieService.getOne(movieId)
  }
  @Put('/:movieId')
  updateOne(
    @Param('movieId', ParseUUIDPipe) movieId: string,
    @Body() movieData: MovieMutationDto
  ) {
    return this.movieService.updateOne(movieId, movieData)
  }
  @Delete('/:movieId')
  deleteOne(
    @Param('movieId', ParseUUIDPipe) movieId: string,
  ) {
    return this.movieService.deleteOne(movieId)
  }
}