import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Author } from './Author';

@Entity({ tableName: 'books' })
export class Book {
  @PrimaryKey()
  id!: number;

  @ManyToOne(() => Author)
  author!: Author;

  @Property()
  name!: string;

  @Property()
  year!: number;
}
