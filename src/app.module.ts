import * as redisStore from 'cache-manager-redis-store';
import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { JwtAuthGuard, RolesGuard } from '@guard';
import { AppService, SeedService } from '@service';
import { JwtStrategy } from '@util';
import { UserModule } from '@module';
import { AppInterceptor } from './interceptor';
import { ServiceModule } from './service/service.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME_DEVELOPMENT,
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      entities: [__dirname + '/entity/*.ts'],
      migrations: [__dirname + '/migration/*.js'],
      logging: true,
      synchronize: true,
      cache: true,
      autoLoadEntities: true,
      migrationsTableName: process.env.DB_MIGRATION_TABLE_NAME,
    }),
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: 'localhost',
      ttl: 60 * 1000,
      port: 6379,
    }),
    UserModule,
    ServiceModule,
  ],
  providers: [
    SeedService,
    JwtStrategy,
    {
      provide: APP_INTERCEPTOR,
      useClass: AppInterceptor,
    },
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
export class AppModule {}
