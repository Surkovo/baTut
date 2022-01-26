import { Resolver, Query } from 'type-graphql';

@Resolver()
export class HelloResolver {
  @Query(() => String) //this is what graphql returns
  hello() {
    return 'hello world from resolvers'; //this is the is body of that query
  }
}
