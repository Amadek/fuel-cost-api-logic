const Ensure = require('@amadek/js-sdk/Ensure');
const fs = require('fs');
const FuelConsumptionParser = require('../logic/FuelConsumptionParser');
const FuelConsumptionAppender = require('../logic/FuelConsumptionAppender');
const ILogger = require('../logic/ILogger');
const createError = require('http-errors');

class IndexController {
  constructor (config, logger) {
    Ensure.notNull(config);
    ILogger.ensureImplemented(logger);
    this._config = config;
    this._logger = logger;
  }

  route (router) {
    router.post('/fuelConsumption', this.postFuelConsumption.bind(this));
    return router;
  }

  postFuelConsumption (req, res, next) {
    const fuelConsumptionFromRequest = req.body;
    fuelConsumptionFromRequest.created = new Date();

    const fuelConsumptionParser = new FuelConsumptionParser(fuelConsumptionFromRequest);
    if (!fuelConsumptionParser.parse(fuelConsumptionFromRequest)) {
      return next(createError(400, fuelConsumptionParser.errorMessage));
    }

    const fuelConsumptionAppender = new FuelConsumptionAppender(fs, this._config, this._logger);
    fuelConsumptionAppender.appendFuelConsumption(fuelConsumptionParser.result)
      .then(() => {
        this._logger.logEvent('PostFuelConsumption', { fuelConsumption: fuelConsumptionParser.result });
        // Send status code 'Created'.
        res.status(201).end();
      })
      .then(next)
      .catch(next);
  }
}

module.exports = IndexController;
