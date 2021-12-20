import { Injectable } from '@nestjs/common';
import { UserRepository } from '@app/repository';
import { User } from '@app/models/entity';
import { CreateUserDto } from '@app/models/dto';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async findById(id: string) {
    return this.userRepository.xfind(id);
  }

  async create(user: CreateUserDto) {
    const entity = new User();
    entity.name = user.name;
    entity.lastname = user.lastname;
    entity.dateOfBirth = user.dateOfBirth;
    entity.email = user.email;
    entity.password = user.password;
    return this.userRepository.xcreate(entity);
  }
}
