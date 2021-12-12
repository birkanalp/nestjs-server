import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { SeedService } from './seed.service';

@Module({
  providers: [AppService, SeedService],
  exports: [AppService, SeedService],
})
export class ServiceModule {}
