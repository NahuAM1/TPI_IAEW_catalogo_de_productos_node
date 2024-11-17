import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerManager } from './commons/integrations/swagger';
import { Port } from './commons/constants/main';
import { ValidationPipe } from '@nestjs/common';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { join } from 'path';

export async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  SwaggerManager.initialize(app);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors();

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'productos',
      protoPath: join(__dirname, '../src/grpc/product.proto'),
      url: 'localhost:5001', // PUERTO DEL SERVICIO GRPC
    },
  });

  await app.startAllMicroservices();

  await app.listen(Port);
}
