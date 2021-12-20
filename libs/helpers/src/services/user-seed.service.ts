import { Injectable, OnApplicationBootstrap } from '@nestjs/common';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  //   constructor(private connection: Connection) {}
  constructor() {}

  async onApplicationBootstrap() {}
}
