const Ensure = require('@amadek/js-sdk/Ensure');
const createError = require('http-errors');

module.exports = class TokenValidator {
  constructor (db) {
    Ensure.notNull(db);
    this._db = db;
  }

  validate (token) {
    if (!token) throw createError(400);

    // If count === 1, user exists and token is valid, otherwise invalid.
    // Limit: 1 assures count only to one for optimization.
    return Promise.resolve()
      .then(() => this._db.collection('user').countDocuments({ accessToken: token }, { limit: 1 }))
      .then(count => {
        if (count !== 1) throw createError(400); 
      });
  }
}
