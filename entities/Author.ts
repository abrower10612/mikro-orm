import { Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { Book } from './Book';

@Entity({ tableName: 'authors' })
export class Author {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property()
  age!: number;

  @OneToMany(() => Book, (book) => book.author)
  book?: Book;
}
