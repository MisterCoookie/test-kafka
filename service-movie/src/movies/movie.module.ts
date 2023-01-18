import {Module} from "@nestjs/common";
import {MovieController} from "./movie.controller";
import {MovieService} from "./movie.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import Movie from "../databases/entity/movie.entity";
import {ClientsModule, Transport} from "@nestjs/microservices";

@Module({
  imports: [
    TypeOrmModule.forFeature([Movie]),
    ClientsModule.register([
      {
        name: 'NOTIF_MICROSERVICE',
        // @ts-ignore
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'notif',
            brokers: ['localhost:9092'],
          },
          producerOnlyMode: true,
          consumer: {
            groupId: 'notif-consumer',
          },
        },
      },
    ]),
  ],
  controllers: [MovieController],
  providers: [MovieService]
})
export class MovieModule {}