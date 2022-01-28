import { Post } from '../entities/Post';
import { MyContext } from '../types';
import { Resolver, Query, Ctx, Arg, Int, Mutation } from 'type-graphql';
import { title } from 'process';

@Resolver()
export class PostResolver {
  @Query(() => [Post]) //this is what graphql returns. In this case it returns an array of post. This also set the graphql type
  posts(@Ctx() { em }: MyContext): Promise<Post[]> {
    return em.find(Post, {});
  }

  @Query(() => Post, { nullable: true }) // lets us return null as a potential graphql type
  post(
    @Arg('id', () => Int) id: number, // the 'id' controls the schema for the post that is being returned
    @Ctx() { em }: MyContext
  ): Promise<Post | null> {
    return em.findOne(Post, { id });
  }

  @Mutation(() => Post) //@Mutations are for creating data. @Query is for getting data
  async createPost(
    @Arg('title', () => String) title: string,
    @Ctx() { em }: MyContext
  ): Promise<Post> {
    const post = em.create(Post, { title });
    await em.persistAndFlush(post);
    return post;
  }

  @Mutation(() => Post, { nullable: true })
  async updatePost(
    @Arg('id', () => Int) id: number,
    @Arg('title', () => String, { nullable: true }) title: string,
    @Ctx() { em }: MyContext
  ): Promise<Post | null> {
    const post = await em.findOne(Post, { id });
    if (!post) {
      return null;
    }
    if (typeof title !== 'undefined') {
      // this makes sure that title is not blank
      post.title = title;
      await em.persistAndFlush(post);
    }
    return post;
  }
}
