import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerManager } from './commons/integrations/swagger';
import { Port } from './commons/constants/main';
import { ValidationPipe } from '@nestjs/common';

export async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  SwaggerManager.initialize(app);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors();
  await app.listen(Port);
}
