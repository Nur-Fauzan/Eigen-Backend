import { Property, Entity, PrimaryKey, ArrayType } from '@mikro-orm/core';

@Entity()
export class Member {
  @PrimaryKey()
  id!: number;

  @Property({ unique: true })
  code!: string;

  @Property()
  name: string;

  @Property({ default: null })
  penaltyEndDate: string | null;

  @Property({ type: 'string[]'})
  borrowedBooks: string[] = [];

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();
}
