import { AdminAuthModule } from '@app/services/admin-auth';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';

@Module({
  imports: [AdminAuthModule],
  controllers: [AuthController],
  providers: [],
})
export class AuthModule {}
