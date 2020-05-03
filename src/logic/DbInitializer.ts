const Ensure = require('@amadek/js-sdk/Ensure');
import { Db } from 'mongodb';

export class DbInitializer {
  private readonly _db: Db;

  public constructor (db: Db) {
    Ensure.notNull(db);
    this._db = db;
  }

  public initialize (): Promise<Db> {
    const godUser: any = { sourceUserId: '00000000000000000000000000000000', accessToken: '00000000000000000000000000000000' };

    return Promise.resolve()
      .then(() => this._db.collection('user').findOneAndUpdate({ sourceUserId: godUser.sourceUserId }, { $set: godUser }, { upsert: true }))
      .then(() => this._db);
  }
}
