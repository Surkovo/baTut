import 'reflect-metadata';
import { MikroORM } from '@mikro-orm/core';
import { __prod__ } from './constants';
import mikroConfig from './mikro-orm.config';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from './resolvers/hello';
import { PostResolver } from './resolvers/post';
import { UserResolver } from './resolvers/user';
//creating a main function since there is no top level await
const main = async () => {
  const orm = await MikroORM.init(mikroConfig); //connect to the db
  await orm.getMigrator().up(); // this runs the migrations
  //const post = orm.em.create(Post, { title: 'first post' }); //this just creates an instance of post. it doesn't insert it into the DB
  // await orm.em.persistAndFlush(post); // this is what inserts to the DB

  const app = express();
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false,
    }),
    context: () => ({ em: orm.em }), // this is a specially object that is accessible for all the resolvers. it's a function that returns the obejct for the conte
  });
  await apolloServer.start(); //add to add this
  apolloServer.applyMiddleware({ app }); //this creates a grapghql endpoint for us.

  // app.get('/', (_, res) => { .   // don't need this since we are using Graphql not REST
  //   res.send('HELLO');
  // });

  app.listen(4000, () => {
    console.log(`server running on port 4000`);
  });
};

main();
