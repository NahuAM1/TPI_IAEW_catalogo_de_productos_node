import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import 'dotenv/config';

export const ORM_CONFIG: TypeOrmModuleOptions = {
  type: 'mariadb',
  host: process.env.DB_RDS_HOST ?? '',
  port: Number(process.env.DB_RDS_PORT || 3306),
  username: process.env.DB_RDS_USER ?? '',
  password: process.env.DB_RDS_PASSWORD ?? '',
  database: process.env.DB_RDS_DATABASE ?? '',
  entities: ['dist/entities/**/*{.ts,.js}'],
  charset: 'utf8mb4_unicode_ci',
  synchronize: false,
};
