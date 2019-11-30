
var FuelInfoAppender = (function () {
  function FuelInfoAppender (fs, config) {
    this.config = config;
    this.fs = fs;
  }

  FuelInfoAppender.prototype.appendFuelInfo = function (fuelInfo, callback) {
    this.fs.appendFile(this.config.fuelDataPath, JSON.stringify(fuelInfo, null, 4) + ',\n', callback);
  };

  return FuelInfoAppender;
}());

module.exports = FuelInfoAppender;
