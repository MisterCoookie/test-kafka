import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Movie {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column()
  public title: string;

  @Column()
  public description: string;
}