import {TypeOrmModuleOptions} from '@nestjs/typeorm';
import * as path from 'path';

const config: TypeOrmModuleOptions = {
  type: 'mysql',
  extra: {
    decimalNumbers: true,
  },
  host:
    process.env.DB_HOST ||
    'path-finder-mysql.cmsrcdbvejea.ap-northeast-2.rds.amazonaws.com',
  port: +process.env.DB_PORT || 3306,
  username: process.env.DB_USERNAME || 'pathfinder',
  password: process.env.DB_PASSWORD || 'pathfinder1234',
  database: process.env.DB_NAME || 'path_finder',
  entities: [path.join(__dirname, '**/*.entity{.ts,.js}')],
  migrations: [__dirname + '/src/migrations/*.ts'],
  cli: {
    migrationsDir: '/src/migrations',
  },
  autoLoadEntities: true,
  timezone: 'Z',
  charset: 'utf8mb4',
  synchronize: true,
};

export = config;
