import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Product } from '../../entities/product';
//configuracion del ORM
export const ORM_CONFIG: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'sql10.freesqldatabase.com',
  port: 3306,
  username: 'sql10743521',
  password: 'pjuUst44gT',
  database: 'sql10743521',
  entities: [Product],
  charset: 'utf8mb4_unicode_ci',
  synchronize: false,
};
