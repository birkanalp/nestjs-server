import { User } from '@entity';
import { Role } from '@model';

export class UserDto {
  id: string;
  username: string;
  email: string;
  name: string;
  lastname: string;
  role: Role;

  constructor(entity?: User) {
    this.id = entity.id;
    this.username = entity.username;
    this.email = entity.email;
    this.name = entity.name;
    this.lastname = entity.lastname;
    this.role = entity.role;
  }
}
