import { Db } from 'mongodb';

export interface IDbConnector
{
  connect(): Promise<Db>;

  close(): Promise<void>;
}
