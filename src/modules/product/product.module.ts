import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entities/product';
import { ConfigRMQ } from 'src/commons/integrations/rabbitmq/rabbitMQ.config';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), ConfigRMQ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
