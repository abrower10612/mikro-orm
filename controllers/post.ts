import { Request, Response } from 'express';
import { Post } from '../entities/Post';
import mikroConfig from '../mikro-orm.config';
import { FilterQuery, MikroORM } from '@mikro-orm/core';

export const create = async (req: Request, res: Response) => {
  const { title, description } = req.body;
  const missingInputs = [];
  if (!title) missingInputs.push('title');
  if (!description) missingInputs.push('description');
  if (missingInputs.length) return res.json({ message: `Missing inputs: ${missingInputs}` });

  try {
    const orm = await MikroORM.init(mikroConfig);
    orm.getMigrator().up();
    const post = orm.em.create(Post, { title, description });
    await orm.em.persistAndFlush(post);
  
    res.json({ message: 'Post successfully created' });
  } catch (err: any) {
    throw new Error(err.message);
  }
}

export const readAll = async (req: Request, res: Response) => {
  try {
    const orm = await MikroORM.init(mikroConfig);
    const allPosts = await orm.em.find(Post, {});
    res.json({ allPosts })
  } catch (err: any) {
    res.json({ Error: err.message })
  }
}

export const readOne = async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    const orm = await MikroORM.init(mikroConfig);
    const post = await orm.em.findOne(Post, { id });
    res.json({post})
  } catch (err: any) {
    res.json({ Error: err.message });
  }
}

export const updateOne = async (req: Request, res: Response) => {
  const { id, title, description } = req.body;
  if (!id) return res.json({ message: 'Missing ID' });
  if (!title && !description) return res.json({ message: 'Please change title or description to update'})
  try {
    const orm = await MikroORM.init(mikroConfig);
    const post = await orm.em.findOne(Post, { id });
    if (!post) return res.json({ message: 'Post not found' });
    const updatedPost = {
      id,
      title: title || post.title,
      description: description || post.description
    }
    const update = await orm.em.nativeUpdate(Post, post, updatedPost);
    res.json({update});
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
}

export const deleteOne = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) return res.json({ message: 'Missing ID'});
  try {
    const orm = await MikroORM.init(mikroConfig);
    const post = await orm.em.findOne(Post, { id } as FilterQuery<Post>);
    if (!post) return res.json({ message: 'Post ID not found' });
    const deleted = await orm.em.nativeDelete(Post, post);
    if (!deleted) throw new Error('Something went wrong');
    res.json({ message: 'Post successfully deleted', deleted });
  } catch (err: any) {
    res.status(500).json({ Error: err.message });
  }
}