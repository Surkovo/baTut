import { Connection, EntityManager, IDatabaseDriver } from '@mikro-orm/core';
import { Request, Response } from 'express';

export type MyContext = {
  em: EntityManager<IDatabaseDriver<Connection>>; //This type definition came from hovering over orm.em in the index file
  req: Request; //update to these once we added session tokens to the project
  res: Response;
};
