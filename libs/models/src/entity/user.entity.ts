import { Column, Entity } from 'typeorm';
import { MyBaseEntity } from './base';

@Entity()
export class User extends MyBaseEntity {
  @Column()
  name: string;
  @Column()
  lastname: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column({ type: 'timestamptz', nullable: true })
  dateOfBirth: Date;
}
