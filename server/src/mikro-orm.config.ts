import { __prod__ } from './constants';
import { Post } from './entities/Post';
import { MikroORM } from '@mikro-orm/core';
import path from 'path';
import { User } from './entities/User';

export default {
  migrations: {
    path: path.join(__dirname, './migrations'), // path to the folder with migrations. Add the path from node to get the absolute path. join() joins the absolute path with whatever is the second arg
    pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files. added j to include js files
  },
  entities: [Post, User],
  dbName: 'batut',
  user: 'kylejohnson',
  password: 'rooster20',
  type: 'postgresql',
  debug: __prod__,
} as Parameters<typeof MikroORM.init>[0]; //need this for typescript to be happy see 25:30 in the video. so protip. look at what MikroORM.init accepts, then add that as a Parameter(this is a TS thing) to the config your exporting for exact types. Parameters returns an array so we want the first one to get all the types for MikroORM.init.
