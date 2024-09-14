import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export default () =>
  ({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [join(__dirname, '..', '..', '..', 'core', 'src', 'entities', '*.entity.{js,ts}')],
    autoLoadEntities: true,
    migrations: [join('migrations', 'model', '*{.js,.ts}')],
    migrationsTableName: 'migrations',
    namingStrategy: new SnakeNamingStrategy(),
  } as TypeOrmModuleOptions);
