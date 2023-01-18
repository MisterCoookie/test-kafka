import {IsNotEmpty, IsString} from "class-validator";

export class MovieMutationDto {

  @IsString()
  @IsNotEmpty()
  public title: string;

  @IsString()
  @IsNotEmpty()
  public description: string;
}