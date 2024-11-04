import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import 'dotenv/config';

export const ORM_CONFIG: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_RDS_HOST ?? 'localhost',
  port: Number(process.env.DB_RDS_PORT || 3306),
  username: process.env.DB_RDS_USER ?? 'root',
  password: process.env.DB_RDS_PASSWORD ?? 'root',
  database: process.env.DB_RDS_DATABASE ?? 'tpi_iaew',
  entities: ['dist/entities/**/*{.ts,.js}'],
  charset: 'utf8mb4_unicode_ci',
  synchronize: false,
};
