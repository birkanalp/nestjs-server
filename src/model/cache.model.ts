import { Role } from '@model';
import { UserDto } from '../dto';

export interface ICacheModel {
  id: string;
  name: string;
  email: string;
  role: Role;
  lastname: string;
}
