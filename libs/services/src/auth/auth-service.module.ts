import { Module } from '@nestjs/common';
import { UserModule } from '../user';
import { AuthService } from './auth-service.service';

@Module({
  imports: [UserModule],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthServiceModule {}
