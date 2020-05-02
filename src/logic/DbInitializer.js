const Ensure = require('@amadek/js-sdk/Ensure');

class DbInitializer {
  constructor (db, config) {
    Ensure.notNull(db);
    Ensure.notNull(config);
    this._db = db;
    this._config = config;
  }

  initialize () {
    const godUser = { sourceUserId: '00000000-0000-0000-0000-000000000000', accessToken: '00000000-0000-0000-0000-000000000000' };

    return Promise.resolve()
      .then(() => this._db.collection('user').findOneAndUpdate({ sourceUserId: godUser.sourceUserId }, { $set: godUser }, { upsert: true }))
      .then(() => this._db);
  }
}

module.exports = DbInitializer;
