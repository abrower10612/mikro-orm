import { Request, Response } from 'express';
import { MikroORM } from '@mikro-orm/core';
import mikroOrmConfig from '../mikro-orm.config';
import { Book } from '../entities';

export const create = async (req: Request, res: Response) => {
  const { name, authorId, year } = req.body;

  if (!name || !authorId || !year) {
    return res.json('name, author, and year required');
  }

  try {
    const orm = await MikroORM.init(mikroOrmConfig);
    const newBook = orm.em.create(Book, { name, author: authorId, year });
    orm.em.persistAndFlush(newBook);
    res.json({ success: true, newBook });
  } catch (error: any) {
    res.json({ Error: error.message });
  }
};

export const readOne = async (req: Request, res: Response) => {
  try {
    const orm = await MikroORM.init(mikroOrmConfig);
    const book = await orm.em.findOne(
      Book,
      { id: 5 },
      { populate: ['author'] }
    );
    if (!book) return res.json({ message: 'No book found' });
    res.json({ book });
  } catch (error: any) {
    res.json({ Error: error.message });
  }
};
