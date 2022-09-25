import 'reflect-metadata';
import { DataSource } from 'typeorm';
import path from 'path';

// To fix the environment variable and prevent errors with migrations
process.env['NODE_CONFIG_DIR'] = path.join(__dirname, 'config');
import config from 'config';

const postgresConfig = config.get<{
  port: number;
  host: string;
  username: string;
  password: string;
  database: string;
}>('databases.postgres');

export const AppDataSource = new DataSource({
  ...postgresConfig,
  type: 'postgres',
  synchronize: false, // development only
  logging: false, // development only
  entities: ['src/components/**/entity/*.entity{.ts,.js}'],
  migrations: ['src/migrations/*{.ts,.js}'],
  //subscribers: ['src/subscribers/**/*{.ts,.js}'],
});
