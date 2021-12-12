import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { Connection } from 'typeorm';
import { User } from '@entity';
import { Role } from '@model';
import { Password } from '../util';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  constructor(private connection: Connection) {}

  async onApplicationBootstrap() {
    const repo = this.connection.getRepository('User');
    const count = await repo.count();
    if (count === 0) {
      const entity = new User();
      const cryptPAss = await Password.crypt('admin');
      entity.name = 'admin';
      entity.lastname = 'admin';
      entity.username = 'admin';
      entity.email = 'admin@gmail.com';
      entity.password = cryptPAss;
      entity.role = Role.Admin;
      entity.createdAt = new Date();
      entity.updatedAt = new Date();
      entity.createdBy = '';
      entity.updatedBy = '';
      repo.insert(entity);
    }
  }
}
