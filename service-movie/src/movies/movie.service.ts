import {Inject, Injectable, Logger, NotFoundException} from "@nestjs/common";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import Movie from "../databases/entity/movie.entity";
import {MovieMutationDto} from "./movie.dto";
import {ClientKafka} from "@nestjs/microservices";

@Injectable()
export class MovieService {
  private logger: Logger = new Logger('MovieService')

  constructor (
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
    @Inject('NOTIF_MICROSERVICE') private readonly notifClient: ClientKafka
  ) {}

  list() {
    return this.moviesRepository.find();
  }
  async create(movieData: MovieMutationDto) {
    const movie = this.moviesRepository.create(movieData)
    await this.moviesRepository.save(movie)

    this.notifClient.emit('create_movie', JSON.stringify(movie))

    return movie;
  }
  async getOne(movieId: string) {
    const movie = await this.moviesRepository.findOne({
      where: {
        id: movieId
      }
    })

    this.logger.log(movie);
    if (movie == null) {
      throw new NotFoundException("The movie can't be found")
    }

    return movie
  }
  async updateOne(movieId: string, movieData: MovieMutationDto) {
    const movie = await this.getOne(movieId);

    movie.title = movieData.title
    movie.description = movieData.description

    await this.moviesRepository.save(movie)

    return movie
  }
  async deleteOne(movieId: string) {
    const movie = await this.getOne(movieId);
    await this.moviesRepository.remove(movie)
    return movie
  }
}