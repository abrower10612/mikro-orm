import { MikroORM } from '@mikro-orm/core';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

export default {
  migrations: {
    path: path.join(__dirname, './migrations'),
    pattern: /^[w-]+\d+\.[tj]s$/,
  },
  entities: ['./entities'],
  dbName: process.env.DB_NAME,
  type: 'mysql',
  debug: process.env.NODE_ENV === 'development',
  host: process.env.DB_HOST,
  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  allowGlobalContext: true,
} as Parameters<typeof MikroORM.init>[0];
