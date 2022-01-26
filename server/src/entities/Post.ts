import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { Field, Int, ObjectType } from 'type-graphql';

@ObjectType() //This turns a graphQL class into a type
@Entity()
export class Post {
  @Field(() => Int) //this exposes this column to our graphql schema. need to define the type for graphql
  @PrimaryKey()
  id!: number;

  @Field(() => String)
  @Property({ type: 'text' })
  title!: string;

  @Field(() => String)
  @Property({ type: 'date' })
  createdAt: Date = new Date();

  @Field(() => String)
  @Property({ type: 'date', onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
