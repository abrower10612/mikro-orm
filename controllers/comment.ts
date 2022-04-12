import { Request, Response } from 'express';
import { Comment } from '../entities/Comment';
import microConfig from '../mikro-orm.config';
import { MikroORM } from '@mikro-orm/core';

export const create = async (req: Request, res: Response) => {
  const { comment } = req.body;
  const missingInputs = [];
  if (!comment) missingInputs.push('comment');
  if (missingInputs.length) return res.json({ message: `Missing inputs: ${missingInputs}` });

  try {
    const orm = await MikroORM.init(microConfig);
    orm.getMigrator().up();
    const post = orm.em.create(Comment, { comment });
    await orm.em.persistAndFlush(post);
  
    res.json({ message: 'Comment successfully created' });
  } catch (err: any) {
    throw new Error(err.message);
  }
}