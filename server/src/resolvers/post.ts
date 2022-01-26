import { Post } from '../entities/Post';
import { MyContext } from '../types';
import { Resolver, Query, Ctx } from 'type-graphql';

@Resolver()
export class PostResolver {
  @Query(() => [Post]) //this is what graphql returns. In this case it returns an array of post. This also set the graphql type
  posts(@Ctx() { em }: MyContext): Promise<Post[]> {
    // this set the typescript type
    return em.find(Post, {});
  }
}
