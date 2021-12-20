import {
  CACHE_MANAGER,
  ExecutionContext,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LoginDto, SignUpDto } from '@app/models/dto';
import { UserService } from '../user';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async login(user: LoginDto) {
    return 'Success Token';
  }

  async signup(user: SignUpDto) {
    return this.userService.create(user);
  }

  async forgotPassword(user: any) {
    return 'Success Token';
  }

  async logout(context: any) {}
}
