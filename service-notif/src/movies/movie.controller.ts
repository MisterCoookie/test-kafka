import {EventPattern, Payload} from "@nestjs/microservices";
import {Logger} from "@nestjs/common";

export class MovieController {
  private logger: Logger = new Logger('MovieController')
  @EventPattern('create_movie')
  handlemovieCreate(@Payload() data: any) {
    this.logger.log(data);
  }
}