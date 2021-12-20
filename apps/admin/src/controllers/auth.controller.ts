import { Controller, Body, Post, Get, ExecutionContext } from '@nestjs/common';
import { AdminAuthService } from '@app/services/admin-auth';
import { Public } from '@app/utils/decorators';
import { LoginDto } from '@app/models/dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AdminAuthService) {}

  @Public()
  @Post('login')
  async login(@Body() req: LoginDto) {
    return this.authService.login(req);
  }

  @Public()
  @Post('logout')
  async logout() {
    return this.authService.logout(null);
  }
}
