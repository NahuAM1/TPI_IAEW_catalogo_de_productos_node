import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Product } from '../../entities/product';
//configuracion del ORM
export const ORM_CONFIG: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'sql10.freesqldatabase.com',
  port: 3306,
  username: 'sql10745351',
  password: 'lFcIpEB7A7',
  database: 'sql10745351',
  entities: [Product],
  charset: 'utf8mb4_unicode_ci',
  synchronize: false,
};
