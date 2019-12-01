
var FuelConsumptionAppender = (function () {
  function FuelConsumptionAppender (fs, config) {
    this.config = config;
    this.fs = fs;
  }

  FuelConsumptionAppender.prototype.appendFuelConsumption = function (fuelConsumption, callback) {
    this.fs.appendFile(this.config.fuelDataPath, JSON.stringify(fuelConsumption, null, 2) + ',\n', callback);
  };

  return FuelConsumptionAppender;
}());

module.exports = FuelConsumptionAppender;
