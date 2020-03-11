const Ensure = require('@amadek/js-sdk/Ensure');
const IDbConnector = require('../logic/IDbConnector');
const FuelConsumptionParser = require('../logic/FuelConsumptionParser');
const FuelConsumptionAppender = require('../logic/FuelConsumptionAppender');
const FuelConsumptionFinder = require('../logic/FuelConsumptionFinder');
const TokenValidator = require('./TokenValidator');
const ILogger = require('../logic/ILogger');
const createError = require('http-errors');

class FuelConsumptionController {
  constructor (dbConnector, config, logger) {
    IDbConnector.ensureImplemented(dbConnector);
    Ensure.notNull(config);
    ILogger.ensureImplemented(logger);
    this._dbConnector = dbConnector;
    this._config = config;
    this._logger = logger;
  }

  route (router) {
    router.post('/', this.postFuelConsumption.bind(this));
    router.get('/', this.getFuelConsumption.bind(this));
    return router;
  }

  postFuelConsumption (req, res, next) {
    let db;

    Promise.resolve()
      .then(() => this._dbConnector.connect())
      .then(database => db = database)
      .then(db => this._validateToken(req, db))
      .then(() => this._parseFuelConsumption(req.body))
      .then(fuelConsumption => {
        const fuelConsumptionAppender = new FuelConsumptionAppender(db, this._logger);
        return fuelConsumptionAppender.append(fuelConsumption);
      })
      .then(() => this._dbConnector.close())
      // Send status code 'Created'.
      .then(() => res.status(201).end())
      .then(next)
      .catch(next);
  }

  getFuelConsumption (req, res, next) {
    Promise.resolve()
      .then(() => this._dbConnector.connect())
      .then(db => {
        const finder = new FuelConsumptionFinder(db, this._logger);
        return finder.getAll();
      })
      .then(fuelConsumptions => res.json(fuelConsumptions))
      .then(() => this._dbConnector.close())
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

  _validateToken (req, db) {
    const token = req.headers.authorization.replace('Bearer ', '');
    console.log(token);
    const tokenValidator = new TokenValidator(db);
    return tokenValidator.validate(token);
  }
}

module.exports = FuelConsumptionController;
