import { Entity, EntitySchema, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
class BaseEntity {
  @PrimaryKey()
  id!: number;
  
  @Property()
  createdAt?: Date;
  
  @Property()
  updatedAt?: Date;

  constructor() {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}

const schema = new EntitySchema({
  name: "BaseEntity",
  abstract: true,
  properties: {
    id: { primary: true, type: "number" },
    createdAt: { type: "Date" },
    updatedAt: { type: "Date", onUpdate: () => new Date() }
  }
});

export = {
  BaseEntity,
  entity: BaseEntity,
  schema,
  label: "BaseEntity"
}