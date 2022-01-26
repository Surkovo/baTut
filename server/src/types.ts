import { Connection, EntityManager, IDatabaseDriver } from '@mikro-orm/core';

export type MyContext = {
  em: EntityManager<IDatabaseDriver<Connection>>; //This type definition came from hovering over orm.em in the index file
};
