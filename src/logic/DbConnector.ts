const Ensure = require('@amadek/js-sdk/Ensure');
import { MongoClient, Db } from 'mongodb';
import { IDbConnector } from './IDbConnector';

export class DbConnector implements IDbConnector {
  private readonly _config: any;
  private _mongoClient: MongoClient;

  public constructor (config: any) {
    Ensure.notNull(config);
    this._config = config;
  }

  public connect (): Promise<Db> {
    this._mongoClient = new MongoClient(this._config.mongodb.url, { useUnifiedTopology: true });

    return Promise.resolve()
      .then(() => this._mongoClient.connect())
      .then(client => {
        const db = client.db(this._config.mongodb.dbName);
        return db;
      });
  }

  public close (): Promise<void> {
    if (!this._mongoClient) throw new Error('Called close before connect.');
    return this._mongoClient.close();
  }
}
