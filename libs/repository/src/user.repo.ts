import { EntityRepository } from 'typeorm';
import { User } from '@app/models/entity';
import { BaseRepository } from './base';

@EntityRepository(User)
export class UserRepository extends BaseRepository<User> {}
