import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'my_underscore_entities' })
export class MyUnderscoreEntity {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;
}
