import { Request, Response } from 'express';
import { MikroORM } from '@mikro-orm/core';
import { Author } from '../entities/Author';
import mikroOrmConfig from '../mikro-orm.config';

export const create = async (req: Request, res: Response) => {
  const { name, age } = req.body;

  if (!name || !age) {
    return res.status(400).json('name and age inputs required');
  }

  try {
    const orm = await MikroORM.init(mikroOrmConfig);
    const newAuthor = orm.em.create(Author, { name, age });
    orm.em.persistAndFlush(newAuthor);
    res.json({ success: true, newAuthor });
  } catch (error: any) {
    res.json({ Error: error.message });
  }
};

export const readOne = async (req: Request, res: Response) => {
  try {
    const orm = await MikroORM.init(mikroOrmConfig);
    const author = await orm.em.findOne(
      Author,
      { id: 1 },
      { populate: ['book'] }
    );
    res.json({ author });
  } catch (error: any) {
    res.json({ Error: error.message });
  }
};
