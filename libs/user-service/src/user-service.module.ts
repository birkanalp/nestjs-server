import { Module } from '@nestjs/common';
import { UserServiceService } from './user-service.service';

@Module({
  providers: [UserServiceService],
  exports: [UserServiceService],
})
export class UserServiceModule {}
