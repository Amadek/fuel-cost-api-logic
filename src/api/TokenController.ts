const Ensure = require('@amadek/js-sdk/Ensure');
import createError from 'http-errors';
import axios from 'axios';
import { Db } from 'mongodb';
import { Router } from 'express';

export class TokenController {
  private readonly _db: Db;
  private readonly _config: any;

  public constructor (db: Db, config: any) {
    Ensure.notNull(db);
    Ensure.notNull(config);
    this._db = db;
    this._config = config;
  }

  public route (router: Router): Router {
    router.put('/', this.putToken.bind(this));
    return router;
  }

  public putToken (req: any, res: any, next: any): void {
    // If token or correct client secret not provided, throw 'Bad Request'.
    if (!req.query.token || !req.query.client_secret || req.query.client_secret !== this._config.api.github.clientSecret) {
      throw createError(400);
    }

    const accessToken = req.query.token;

    Promise.resolve()
      .then(() => this._getGitHubUser(accessToken))
      .then(githubUser => ({ sourceUserId: githubUser.data.id, accessToken: accessToken }))
      .then(this._updateOrAddUserInDB.bind(this))
      // Send status 'Created'.
      .then(() => res.status(201).end())
      .then(next)
      .catch(next);
  }

  private _getGitHubUser (accessToken: string): Promise<any> {
    return axios({
      method: 'get',
      url: 'https://api.github.com/user',
      headers: {
        Authorization: 'token ' + accessToken,
        accept: 'application/json'
      }
    });
  }

  private _updateOrAddUserInDB (user: any): Promise<any> {
    return this._db.collection('user').findOneAndUpdate({ sourceUserId: user.sourceUserId }, { $set: user }, { upsert: true });
  }
}
