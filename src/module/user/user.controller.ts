import { Body, Controller, Post, Headers } from '@nestjs/common';
import {
  SigninRequestDto,
  SigninResponseDto,
  SignupDto,
  UserDto,
  ForgotPasswordRequestDto,
  UpdatePasswordRequestDto,
} from '@dto';
import { UserService } from './user.service';
import { Public } from '@guard';

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Public()
  @Post('signin')
  signin(@Body() req: SigninRequestDto): Promise<SigninResponseDto> {
    return this.usersService.signin(req);
  }

  @Post('signout')
  signout(@Headers('authorization') token: string): Promise<boolean> {
    return this.usersService.signout(token);
  }

  @Post()
  signup(@Body() req: SignupDto): Promise<UserDto> {
    return this.usersService.signup(req);
  }

  @Post()
  forgotPassword(@Body() req: ForgotPasswordRequestDto): Promise<boolean> {
    return this.usersService.forgotPassword(req);
  }

  @Post()
  updatePassword(@Body() req: UpdatePasswordRequestDto): Promise<boolean> {
    return this.usersService.updatePassword(req);
  }
}
