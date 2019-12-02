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
    var self = this;
    this.fs.access(this.config.fuelDataPath, this.fs.constants.F_OK, function (err) {
      // Check file exists. If not, append file with one result in array.
      if (err) {
        self.fs.appendFile(self.config.fuelDataPath, JSON.stringify([fuelConsumption], null, 2), callback);
        return;
      }
      // If exists, read data, parse, add new record and write.
      self.fs.readFile(self.config.fuelDataPath, function (err, fileData) {
        if (err) {
          console.error(err);
          return;
        }
        var fuelConsumptionRecords = [];
        try {
          fuelConsumptionRecords = JSON.parse(fileData);
        } catch (err) {
          console.error(err);
        }
        fuelConsumptionRecords.push(fuelConsumption);
        self.fs.writeFile(self.config.fuelDataPath, JSON.stringify(fuelConsumptionRecords, null, 2), callback);
      });
    });
  };

  return FuelConsumptionAppender;
}());

module.exports = FuelConsumptionAppender;
