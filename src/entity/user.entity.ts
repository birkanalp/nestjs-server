import { Entity, Column } from 'typeorm';
import { Role } from '../model';
import { MyBaseEntity } from './base.entity';

@Entity()
export class User extends MyBaseEntity {
  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: Role;
}
