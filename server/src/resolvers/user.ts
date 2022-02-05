import {
  Resolver,
  Mutation,
  Arg,
  Field,
  InputType,
  Ctx,
  ObjectType,
} from 'type-graphql';
import { MyContext } from '../types';
import argon2 from 'argon2';
import { User } from '../entities/User';

@InputType() //creating class input in an alternative to using @args(). inputtypes are used for inputs
class UserNamePasswordInput {
  @Field()
  username: string;

  @Field()
  password: string;
}
@ObjectType() //Object types are something we return
class FieldError {
  @Field(() => [Error], { nullable: true })
  field: string;

  @Field()
  message: string;
}
@ObjectType() //Object types are something we return
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
export class UserResolver {
  @Mutation(() => User)
  async register(
    @Arg('options') options: UserNamePasswordInput,
    @Ctx() { em }: MyContext
  ) {
    const hashedPassword = await argon2.hash(options.password);
    const user = em.create(User, {
      username: options.username,
      password: hashedPassword,
    });
    await em.persistAndFlush(user);
    return user;
  }
  @Mutation(() => UserResponse)
  async login(
    @Arg('options') options: UserNamePasswordInput,
    @Ctx() { em }: MyContext
  ): Promise<UserResponse> {
    const user = await em.findOne(User, { username: options.username });
    if (!user) {
      return {
        errors: [
          {
            field: 'username',
            message: 'could not find username',
          },
        ],
      };
    }
    const valid = await argon2.verify(user.password, options.password); //get the user password from the db once we findone, and the options.password is coming from the user input
    if (!valid) {
      return {
        errors: [
          {
            field: 'password',
            message: 'invalid password',
          },
        ],
      };
    }
    return user;
  }
}
