import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../../entities/product';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    ClientsModule.register([
      {
        // Nombre para inyectar el cliente
        name: 'PRODUCT_SERVICE', 
        transport: Transport.RMQ,
        options: {
          //  URL de tu servidor RabbitMQ
          urls: ['amqps://pfrmyfie:nQJY633UWr9eNukGMAQut_DOrNGhdhAq@prawn.rmq.cloudamqp.com/pfrmyfie'], 
          // Nombre de la cola
          queue: 'productos',              
          queueOptions: {
            // Configurar según lo que necesites
            durable: false,                
          },
        },
      },
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}

