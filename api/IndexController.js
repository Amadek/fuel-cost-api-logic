var fs = require('fs');
var FuelConsumptionParser = require('../logic/FuelConsumptionParser'); 
var FuelConsumptionAppender = require('../logic/FuelConsumptionAppender');
var createError = require('http-errors');

var IndexController = (function () {
  function IndexController (config) {
    this.config = config;
    this.fuelConsumptionParser = new FuelConsumptionParser();
    this.fuelConsumptionAppender = new FuelConsumptionAppender(fs, config);
  }

  IndexController.prototype.route = function (router) {
    router.post('/fuelConsumption', this.postFuelConsumption.bind(this));
    return router;
  };

  IndexController.prototype.postFuelConsumption = function (req, res, next) {
    var fuelConsumptionFromRequest = req.body;
    fuelConsumptionFromRequest.created = new Date();

    try {
      var parseResult = this.fuelConsumptionParser.parse(fuelConsumptionFromRequest);
    } catch {
      return next(createError(400, 'Failed to parse fuel consumption data.'));
    }

    if (!parseResult.success) return next(createError(400, parseResult.message));

    this.fuelConsumptionAppender.appendFuelConsumption(parseResult.fuelConsumption, function (err) {
      if (err) return next(err);
      // Send status code 'Created'.
      res.status(201).end();
      next();
    });
  };

  return IndexController;
}());

module.exports = IndexController;
