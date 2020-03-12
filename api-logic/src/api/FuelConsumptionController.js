const Ensure = require('@amadek/js-sdk/Ensure');
const FuelConsumptionParser = require('../logic/FuelConsumptionParser');
const FuelConsumptionAppender = require('../logic/FuelConsumptionAppender');
const FuelConsumptionFinder = require('../logic/FuelConsumptionFinder');
const TokenValidator = require('./TokenValidator');
const ILogger = require('../logic/ILogger');
const createError = require('http-errors');

class FuelConsumptionController {
  constructor (db, config, logger) {
    Ensure.notNull(db);
    Ensure.notNull(config);
    ILogger.ensureImplemented(logger);
    this._db = db;
    this._config = config;
    this._logger = logger;
  }

  route (router) {
    router.post('/', this.postFuelConsumption.bind(this));
    router.get('/', this.getFuelConsumption.bind(this));
    return router;
  }

  postFuelConsumption (req, res, next) {
    Promise.resolve()
      .then(() => this._validateToken(req))
      .then(() => this._parseFuelConsumption(req.body))
      .then(fuelConsumption => {
        const fuelConsumptionAppender = new FuelConsumptionAppender(this._db, this._logger);
        return fuelConsumptionAppender.append(fuelConsumption);
      })
      // Send status code 'Created'.
      .then(() => res.status(201).end())
      .then(next)
      .catch(next);
  }

  getFuelConsumption (req, res, next) {
    Promise.resolve()
      .then(() => this._validateToken(req))
      .then(() => {
        const finder = new FuelConsumptionFinder(this._db, this._logger);
        return finder.getAll();
      })
      .then(fuelConsumptions => res.json(fuelConsumptions))
      .then(next)
      .catch(next);
  }

  _parseFuelConsumption (body) {
    const fuelConsumptionFromRequest = body;
    fuelConsumptionFromRequest.created = new Date();

    const fuelConsumptionParser = new FuelConsumptionParser(fuelConsumptionFromRequest);
    if (!fuelConsumptionParser.parse(fuelConsumptionFromRequest)) {
      throw createError(400, fuelConsumptionParser.errorMessage);
    }

    return fuelConsumptionParser.result;
  }

  _validateToken (req) {
    if (!req.headers.authorization) throw createError(400);

    const token = req.headers.authorization.replace('Bearer ', '');
    const tokenValidator = new TokenValidator(this._db);
    return tokenValidator.validate(token);
  }
}

module.exports = FuelConsumptionController;
