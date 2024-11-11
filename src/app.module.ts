import { Module } from '@nestjs/common';
import { ProductModule } from './modules/product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ORM_CONFIG } from './commons/constants/mysql-config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [TypeOrmModule.forRoot(ORM_CONFIG), 
    ProductModule,
    ClientsModule.register([
      {
        name: 'PRODUCT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqps://pfrmyfie:nQJY633UWr9eNukGMAQut_DOrNGhdhAq@prawn.rmq.cloudamqp.com/pfrmyfie'], // CloudAMQP URL
          queue: 'productos',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}