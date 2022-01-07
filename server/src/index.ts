import { expr, MikroORM } from '@mikro-orm/core';
import { __prod__ } from './constants';
import { Post } from './entities/Post';
import mikroConfig from './mikro-orm.config';
import express from 'express';
//creating a main function since there is no top level await
const main = async () => {
  const orm = await MikroORM.init(mikroConfig); //connect to the db
  await orm.getMigrator().up(); // this runs the migrations
  //const post = orm.em.create(Post, { title: 'first post' }); //this just creates an instance of post. it doesn't insert it into the DB
  // await orm.em.persistAndFlush(post); // this is what inserts to the DB

  const app = express();
  app.get('/', (_, res) => {
    res.send('helloo');
  });
  app.listen(4000, () => {
    console.log(`server  running on port 4000`);
  });
};

main();
