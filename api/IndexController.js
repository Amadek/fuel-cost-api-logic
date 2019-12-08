var fs = require('fs');
var FuelConsumptionParser = require('../logic/FuelConsumptionParser'); 
var FuelConsumptionAppender = require('../logic/FuelConsumptionAppender');

var IndexController = (function () {
  function IndexController (config) {
    this.config = config;
    this.fuelConsumptionParser = new FuelConsumptionParser();
    this.fuelConsumptionAppender = new FuelConsumptionAppender(fs, config);
  }

  IndexController.prototype.route = function (router) {
    router.get('/', this.index.bind(this));
    router.put('/add/liters/:liters/kilometers/:kilometers/fuelPrice/:fuelPrice', this.putFuelData.bind(this));
    return router;
  };

  IndexController.prototype.index = function (req, res, next) {
    res.send('ACTIVE');
    next();
  };

  IndexController.prototype.putFuelData = function (req, res, next) {
    var fuelConsumptionFromRequest = {
      liters: req.params.liters,
      kilometers: req.params.kilometers,
      fuelPrice: req.params.fuelPrice,
      created: new Date()
    };

    var parseResult = this.fuelConsumptionParser.parse(fuelConsumptionFromRequest);

    if (!parseResult.success) return next(new Error(parseResult.message));

    this.fuelConsumptionAppender.appendFuelConsumption(parseResult.fuelConsumption, function (err) {
      if (err) return next(err);
      res.send('OK');
      next();
    });
  };

  return IndexController;
}());

module.exports = IndexController;
