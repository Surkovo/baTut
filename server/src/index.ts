import 'reflect-metadata';
import { MikroORM } from '@mikro-orm/core';
import { __prod__ } from './constants';
import mikroConfig from './mikro-orm.config';
import express from 'express';
//import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from './resolvers/hello';
import { PostResolver } from './resolvers/post';
import { UserResolver } from './resolvers/user';
import session from 'express-session';
import connectRedis from 'connect-redis';
// redis@v4
import { createClient } from 'redis';
import dotenv from 'dotenv';
import { MyContext } from './types';
dotenv.config();

//creating a main function since there is no top level await
const main = async () => {
  const orm = await MikroORM.init(mikroConfig); //connect to the db
  await orm.getMigrator().up(); // this runs the migrations
  //const post = orm.em.create(Post, { title: 'first post' }); //this just creates an instance of post. it doesn't insert it into the DB
  // await orm.em.persistAndFlush(post); // this is what inserts to the DB

  const app = express();
  //app.use(cors());
  const redisClient = createClient({ legacyMode: true }); // note that both the redis and the apollo server connection below should be both where wou declare the applyMiddleware. The order the have the middleware is the order in which it will run, so the session middleware will run before the apollo middleware
  const RedisStore = connectRedis(session);

  redisClient.connect().catch(console.error);
  app.set('trust proxy', process.env.NODE_ENV !== 'production'); //added to make cookies work in apollo server
  app.use(
    session({
      name: 'qid',
      store: new RedisStore({ client: redisClient, disableTouch: true }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years lol
        sameSite: 'none', //csrf. UPDATED. Set this to none in order for secure: true to work below. See notes for more.
        httpOnly: true, // this ensures the frontend can not access the cookie,
        secure: true, // this ensures the cookie only works in https. set to only work in prod. UDPATED this to get the cookie to work, now set to true
      },
      saveUninitialized: false,
      secret: `${process.env.JWT_TOKEN}`,
      resave: false,
    }) //the disableTouch let the connection live on until we terminate it.
  );
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }): MyContext => ({ em: orm.em, req, res }), // this is a specially object that is accessible for all the resolvers. it's a function that returns the obejct for the context. we pass in the req and res object to give apollo server access to the session
  });
  await apolloServer.start(); //add to add this
  apolloServer.applyMiddleware({
    app,
    cors: { credentials: true },
  }); //this creates a grapghql endpoint for us. For CORS problems I removed the following option the the cors property. origin: 'https://studio.apollographql.com'. this got it to work with the front end, but might have broken the graphql playground

  // app.get('/', (_, res) => { .   // don't need this since we are using Graphql not REST
  //   res.send('HELLO');
  // });

  app.listen(4000, () => {
    console.log(`server running on port 4000`);
  });
};

main();
