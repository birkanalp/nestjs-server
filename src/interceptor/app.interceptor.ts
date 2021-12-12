import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  CACHE_MANAGER,
  Inject,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { AppService } from '@service';
import { ICacheModel } from '@model';

@Injectable()
export class AppInterceptor implements NestInterceptor {
  constructor(
    private appService: AppService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async intercept(context: ExecutionContext, next: CallHandler) {
    const req = context.switchToHttp().getRequest();
    const token: string = req?.headers?.authorization || '';
    const cacheData = await this.cacheManager.get<ICacheModel>(
      token.replace('Bearer ', ''),
    );
    this.appService.setActiveUser(cacheData);
    return next.handle();
  }
}
