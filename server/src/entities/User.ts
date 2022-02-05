import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { Field, ObjectType } from 'type-graphql';

@ObjectType() //This turns a graphQL class into a type
@Entity()
export class User {
  @Field() // ints can be inferred
  @PrimaryKey()
  id!: number;

  @Field(() => String)
  @Property({ type: 'date' })
  createdAt: Date = new Date();

  @Field(() => String)
  @Property({ type: 'date', onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @Field()
  @Property({ type: 'text', unique: true })
  username!: string;

  @Property({ type: 'text' })
  password!: string;
}
