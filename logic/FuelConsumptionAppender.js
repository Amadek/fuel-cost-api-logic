var Ensure = require('@amadek/js-sdk/Ensure');
var IFuelConsumption = require('./IFuelConsumption');
var ILogger = require('./ILogger');

var FuelConsumptionAppender = (function () {
  function FuelConsumptionAppender (fs, config, logger) {
    Ensure.notNull(fs);
    Ensure.notNull(config);
    Ensure.notNull(logger);
    ILogger.ensureImplemented(logger);
    this.fs = fs;
    this.config = config;
    this.logger = logger;
  }

  FuelConsumptionAppender.prototype.appendFuelConsumption = function (fuelConsumption, callback) {
    IFuelConsumption.ensureImplemented(fuelConsumption);

    this.fs.access(this.config.fuelDataPath, this.fs.constants.F_OK, onFileAccessChecked.bind(this));

    function onFileAccessChecked (err) {
      // Check file exists. If not, create file with one result in array.
      if (err) return this.fs.appendFile(this.config.fuelDataPath, JSON.stringify([fuelConsumption], null, 2), callback);
      // If exists, read data, parse, and add new record to the file.
      this.fs.readFile(this.config.fuelDataPath, onFileReaded.bind(this));
    }

    function onFileReaded (err, fileData) {
      if (err) return callback(err);
      var fuelConsumptionRecords = [];
      try {
        fuelConsumptionRecords = JSON.parse(fileData);
      } catch (err) {
        // If error occured, we only handle it and update file with only one record.
        this.logger.logTrace('Invalid file format. Saving file with only the newest record.');
      }
      fuelConsumptionRecords.push(fuelConsumption);
      this.fs.writeFile(this.config.fuelDataPath, JSON.stringify(fuelConsumptionRecords, null, 2), callback);
    }
  };

  return FuelConsumptionAppender;
}());

module.exports = FuelConsumptionAppender;
