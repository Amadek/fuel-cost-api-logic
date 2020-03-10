const Ensure = require('@amadek/js-sdk/Ensure');
const createError = require('http-errors');
const IDbConnector = require('../logic/IDbConnector');
const axios = require('axios');

module.exports = class TokenController {
  constructor (dbConnector, config) {
    IDbConnector.ensureImplemented(dbConnector);
    Ensure.notNull(config);
    this._dbConnector = dbConnector;
    this._config = config;
  }

  route (router) {
    router.put('/', this.putToken.bind(this));
    return router;
  }

  putToken (req, res, next) {
    // If token or correct client secret not provided, throw 'Bad Request'. 
    if (!req.query.token || !req.query.client_secret || req.query.client_secret !== this._config.api.github.clientSecret) {
      throw createError(400)
    }

    const accessToken = req.query.token;

    Promise.resolve()
      .then(() => this._getGitHubUser(accessToken))
      .then(githubUser => ({ sourceUserId: githubUser.data.id, accessToken: accessToken }))
      .then(this._updateOrCreateUserInDB.bind(this))
      // Send status 'Created'.
      .then(() => res.status(201).end())
      .then(next)
      .catch(next);
  }

  _getGitHubUser (accessToken) {
    return axios({
      method: 'get',
      url: 'https://api.github.com/user',
      headers: {
        Authorization: 'token ' + accessToken,
        accept: 'application/json'
      }
    });
  }

  _updateOrCreateUserInDB (user) {
    return Promise.resolve()
      .then(() => this._dbConnector.connect())
      .then(db => db.collection('user').findOneAndUpdate({ sourceUserId: user.sourceUserId }, { $set: user }, { upsert: true }))
      .finally(() => this._dbConnector.close());
  }
}
