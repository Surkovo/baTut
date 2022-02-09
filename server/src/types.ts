import { Connection, EntityManager, IDatabaseDriver } from '@mikro-orm/core';
import { Request, Response, Express } from 'express';

export type MyContext = {
  em: EntityManager<IDatabaseDriver<Connection>>; //This type definition came from hovering over orm.em in the index file
  req: Request & { session: any }; //update to these once we added session tokens to the project. Added the any type to the session type since Express.Session was not available. The & in typescript joins two types together.
  res: Response;
};
