const Ensure = require('@amadek/js-sdk/Ensure');
const axios = require('axios').default;

class AuthController {
  constructor (config) {
    Ensure.notNull(config);
    this._config = config;
  }

  route (router) {
    router.get('/', this.getAuth.bind(this));
    router.get('/redirect', this.getAuthRedirect.bind(this));
    return router;
  }

  getAuth (req, res) {
    const url = axios.getUri({
      method: 'get',
      url: 'https://github.com/login/oauth/authorize',
      params: {
        client_id: this._config.api.github.clientId,
        redirect_url: 'http://localhost:3000/auth/redirect'
      }
    });

    res.redirect(url);
  }

  getAuthRedirect (req, res, next) {
    const requestToken = req.query.code;

    Promise.resolve()
      .then(() => axios({
        method: 'post',
        url: 'https://github.com/login/oauth/access_token',
        params: {
          client_id: this._config.api.github.clientId,
          client_secret: this._config.api.github.clientSecret,
          code: requestToken
        },
        headers: {
          accept: 'application/json'
        }
      }))
      .then(response => response.data.access_token)
      .then(accessToken => axios({
        method: 'get',
        url: 'https://api.github.com/user',
        headers: {
          Authorization: 'token ' + accessToken,
          accept: 'application/json'
        }
      }))
      .then(response => {
        res.send(`Hello ${response.data.login} from GitHub!`);
      })
      .then(next)
      .catch(next);
  }
}

module.exports = AuthController;
