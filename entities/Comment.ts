import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'comments' })
export class Comment {
  @PrimaryKey()
  id!: number;

  @Property({ type: 'date' })
  createdAt? = new Date();

  @Property({ type: 'date', onUpdate: () => new Date() })
  updatedAt? = new Date();

  @Property({ type: 'text' })
  comment!: string;
}
