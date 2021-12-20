import { Module } from '@nestjs/common';
import { AdminAuthService } from './auth-service.service';

@Module({
  providers: [AdminAuthService],
  exports: [AdminAuthService],
})
export class AdminAuthModule {}
