const Ensure = require('@amadek/js-sdk/Ensure');
const MongoClient = require('mongodb').MongoClient;

class DbConnector {
  constructor (config) {
    Ensure.notNull(config);
    this._config = config;
  }

  connect () {
    this._mongoClient = new MongoClient(this._config.mongodb.url, { useUnifiedTopology: true });

    return Promise.resolve()
      .then(() => this._mongoClient.connect())
      .then(client => {
        const db = client.db(this._config.mongodb.dbName);
        return db;
      });
  }

  close () {
    if (!this._mongoClient) throw new Error('Called close before connect.');
    return this._mongoClient.close();
  }
}

module.exports = DbConnector;
