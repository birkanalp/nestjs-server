import {
  CACHE_MANAGER,
  ExecutionContext,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LoginDto } from '@app/models/dto';

@Injectable()
export class AdminAuthService {
  constructor() {}

  async login(user: LoginDto) {
    return 'Success Token';
  }

  async logout(context: any) {}
}
