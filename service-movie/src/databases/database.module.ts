import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import Movie from "./entity/movie.entity";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forRoot()],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRESQL_ADDON_HOST'),
        port: configService.get('POSTGRESQL_ADDON_PORT'),
        username: configService.get('POSTGRESQL_ADDON_USER'),
        password: configService.get('POSTGRESQL_ADDON_PASSWORD'),
        database: configService.get('POSTGRESQL_ADDON_DB'),
        entities: [Movie],
        synchronize: true,
      })
    }),
  ],
})
export class DatabaseModule {}
