import { AuthServiceModule } from '@app/services/auth';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';

@Module({
  imports: [AuthServiceModule],
  controllers: [AuthController],
  providers: [],
})
export class AuthModule {}
