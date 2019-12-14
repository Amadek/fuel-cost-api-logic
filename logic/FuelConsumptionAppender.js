var Ensure = require('@amadek/js-sdk/Ensure');
var IFuelConsumption = require('./IFuelConsumption');

var FuelConsumptionAppender = (function () {
  function FuelConsumptionAppender (fs, env) {
    Ensure.notNull(fs);
    Ensure.notNull(env);
    this.fs = fs;
    this.env = env;
  }

  FuelConsumptionAppender.prototype.appendFuelConsumption = function (fuelConsumption, callback) {
    IFuelConsumption.ensureImplemented(fuelConsumption);

    this.fs.access(this.env.FUEL_DATA_PATH, this.fs.constants.F_OK, onFileAccessChecked.bind(this));

    function onFileAccessChecked (err) {
      // Check file exists. If not, create file with one result in array.
      if (err) return this.fs.appendFile(this.env.FUEL_DATA_PATH, JSON.stringify([fuelConsumption], null, 2), callback);
      // If exists, read data, parse, and add new record to the file.
      this.fs.readFile(this.env.FUEL_DATA_PATH, onFileReaded.bind(this));
    }

    function onFileReaded (err, fileData) {
      if (err) return callback(err);
      var fuelConsumptionRecords = [];
      try {
        fuelConsumptionRecords = JSON.parse(fileData);
      } catch (err) {
        // If error occured, we only handle it and update file with only one record.
        console.error(err);
      }
      fuelConsumptionRecords.push(fuelConsumption);
      this.fs.writeFile(this.env.FUEL_DATA_PATH, JSON.stringify(fuelConsumptionRecords, null, 2), callback);
    }
  };

  return FuelConsumptionAppender;
}());

module.exports = FuelConsumptionAppender;
