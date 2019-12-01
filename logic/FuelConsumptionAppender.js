var Ensure = require('@amadek/js-sdk/Ensure');
var IFuelConsumption = require('./IFuelConsumption');

var FuelConsumptionAppender = (function () {
  function FuelConsumptionAppender (fs, config) {
    Ensure.notNull(fs);
    Ensure.notNull(config);
    this.config = config;
    this.fs = fs;
  }

  FuelConsumptionAppender.prototype.appendFuelConsumption = function (fuelConsumption, callback) {
    IFuelConsumption.ensureImplemented(fuelConsumption);
    this.fs.appendFile(this.config.fuelDataPath, JSON.stringify(fuelConsumption, null, 2) + ',\n', callback);
  };

  return FuelConsumptionAppender;
}());

module.exports = FuelConsumptionAppender;
