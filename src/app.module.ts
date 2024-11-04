import { Module } from '@nestjs/common';
import { ProductModule } from './modules/product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ORM_CONFIG } from './commons/constants/mysql-config';

@Module({
  imports: [TypeOrmModule.forRoot(ORM_CONFIG), ProductModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
