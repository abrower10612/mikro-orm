import { Post } from './entities/Post';
import { __prod__ } from './constants';
import { MikroORM } from '@mikro-orm/core';
import path from 'path';
import dotenv from 'dotenv';
import { Comment } from './entities/Comment';
dotenv.config();

export default {
  migrations: {
    path: path.join(__dirname, './migrations'),
    pattern: /^[w-]+\d+\.[tj]s$/
  },
  entities: [Post, Comment],
  dbName: 'tax_credit_library',
  type: 'mysql',
  debug: !__prod__,
  host: process.env.DB_HOST,
  port: 3306,
  user: 'admin',
  password: process.env.DB_PASS,
  allowGlobalContext: true
} as Parameters<typeof MikroORM.init>[0];