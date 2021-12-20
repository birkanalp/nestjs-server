import { NestFactory } from '@nestjs/core';
import { AdminAppModule } from './admin-app.module';

async function bootstrap() {
  const app = await NestFactory.create(AdminAppModule, { cors: true });
  await app.listen(5005);
}
bootstrap();
