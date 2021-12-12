import {
  Injectable,
  CanActivate,
  ExecutionContext,
  CACHE_MANAGER,
  Inject,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Cache } from 'cache-manager';
import { ROLES_KEY } from '@decorator';
import { Role } from '@model';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const req = context.switchToHttp().getRequest();
    const key = req.headers.authorization?.replace('Bearer ', '');
    const user = await this.cacheManager.get<any>(key);
    return requiredRoles.some((role) => user?.role === role);
  }
}
