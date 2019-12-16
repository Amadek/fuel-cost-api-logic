var Ensure = require('@amadek/js-sdk/Ensure');

var FuelConsumptionFinder = (function () {
  function FuelConsumptionFinder (fuelConsumptionParser, fs, config) {
    Ensure.notNull(fuelConsumptionParser);
    Ensure.notNull(fs);
    Ensure.notNull(config);
    this.fuelConsumptionParser = fuelConsumptionParser;
    this.fs = fs;
    this.config = config;
  }

  FuelConsumptionFinder.prototype.getAll = function (callback) {
    this.fs.readFile(this.config.fuelDataPath, onFileReaded.bind(this));

    function onFileReaded (err, fileData) {
      if (err) return callback(err);

      var fuelConsumptionRecords = [];
      try {
        fuelConsumptionRecords = JSON.parse(fileData);
      } catch (err) {
        // If error occured, we only pass it to callback.
        return callback(err);
      }

      return callback(null, fuelConsumptionRecords);
    }
  };
}());

module.exports = FuelConsumptionFinder;
