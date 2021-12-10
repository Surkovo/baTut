import { MikroORM } from '@mikro-orm/core';
import { __prod__ } from './constants';
import { Post } from './entities/Post';
import mikroConfig from './mikro-orm.config';
//creating a main function since there is no top level await
const main = async () => {
  const orm = await MikroORM.init(mikroConfig);

  const post = orm.em.create(Post, { title: 'first post' }); //this just creates an instance of post. it doesn't insert it into the DB
  await orm.em.persistAndFlush(post); // this is what inserts to the DB
};

main();
