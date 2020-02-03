var Ensure = require('@amadek/js-sdk/Ensure');
var fs = require('fs');
var FuelConsumptionParser = require('../logic/FuelConsumptionParser');
var FuelConsumptionAppender = require('../logic/FuelConsumptionAppender');
var ILogger = require('../logic/ILogger');
var createError = require('http-errors');

var IndexController = (function () {
  function IndexController (config, logger) {
    Ensure.notNull(config);
    Ensure.notNull(logger);
    ILogger.ensureImplemented(logger);
    this.config = config;
    this.logger = logger;
    this.fuelConsumptionParser = new FuelConsumptionParser();
    this.fuelConsumptionAppender = new FuelConsumptionAppender(fs, config, logger);
  }

  IndexController.prototype.route = function (router) {
    router.post('/fuelConsumption', this.postFuelConsumption.bind(this));
    return router;
  };

  IndexController.prototype.postFuelConsumption = function (req, res, next) {
    var fuelConsumptionFromRequest = req.body;
    fuelConsumptionFromRequest.created = new Date();

    try {
      if (!this.fuelConsumptionParser.parse(fuelConsumptionFromRequest)) {
        return next(createError(400, this.fuelConsumptionParser.getErrorMessage()));
      }
    } catch {
      return next(createError(400, 'Failed to parse fuel consumption data.'));
    }

    var self = this;
    this.fuelConsumptionAppender.appendFuelConsumption(this.fuelConsumptionParser.getResult(), function (err) {
      if (err) return next(err);
      self.logger.logEvent('PostFuelConsumption', { fuelConsumption: self.fuelConsumptionParser.getResult() });
      // Send status code 'Created'.
      res.status(201).end();
      next();
    });
  };

  return IndexController;
}());

module.exports = IndexController;
