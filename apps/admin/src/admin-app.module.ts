import { CacheModule, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './controllers/auth.module';
import { JwtAuthGuard, RolesGuard } from '@app/utils/guards';
import { JwtStrategy } from '@app/utils/strategies';
import { SeedService } from '@app/helpers/services';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as redisStore from 'cache-manager-redis-store';
import { getConnectionOptions } from 'typeorm';
import Entities from '@app/models/entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          entities: Entities,
        }),
    }),
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: 'localhost',
      ttl: 60 * 1000,
      port: 6379,
    }),
  ],
  controllers: [],
  providers: [
    SeedService,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AdminAppModule {}
