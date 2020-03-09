const createError = require('http-errors');

class TokenController {
  route (router) {
    router.put('/', this.putToken.bind(this));
    return router;
  }

  putToken (req, res, next) {
    // If token or correct client secret not provide, throw Bad Request. 
    if (!req.query.token || !req.query.client_secret) throw createError(400); 
    console.log(req.query.token);
    console.log(req.query.client_secret);
    res.send('Mam Token!');
    next();
  }
}

module.exports = TokenController;