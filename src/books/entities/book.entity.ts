import { Property, Entity, PrimaryKey } from '@mikro-orm/core';

@Entity()
export class Book {
  @PrimaryKey()
  id!: number;
  
  @Property({ unique: true })
  code!: string;

  @Property()
  title: string;

  @Property()
  author: string;

  @Property()
  stock: number;

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();
}