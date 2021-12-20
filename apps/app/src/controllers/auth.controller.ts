import { Controller, Body, Post, Get, ExecutionContext } from '@nestjs/common';
import { AuthService } from '@app/services/auth';
import { LoginDto, SignUpDto } from '@app/models/dto';
import { Public } from '@app/utils/decorators';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() req: LoginDto) {
    return this.authService.login(req);
  }

  @Public()
  @Post('signup')
  async signup(@Body() req: SignUpDto) {
    return this.authService.signup(req);
  }

  @Public()
  @Post('forgot-password')
  async forgotPassword(@Body() req: LoginDto) {
    return this.authService.forgotPassword(req);
  }

  @Public()
  @Post('logout')
  async logout() {
    return this.authService.logout(null);
  }
}
