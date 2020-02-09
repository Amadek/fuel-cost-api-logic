const Ensure = require('@amadek/js-sdk/Ensure');
const IFuelConsumption = require('./IFuelConsumption');
const ILogger = require('./ILogger');

class FuelConsumptionAppender {
  constructor (fs, config, logger) {
    Ensure.notNull(fs);
    Ensure.notNull(config);
    ILogger.ensureImplemented(logger);
    this._fs = fs;
    this._config = config;
    this._logger = logger;
  }

  appendFuelConsumption (fuelConsumption) {
    IFuelConsumption.ensureImplemented(fuelConsumption);

    // File opened for reading and writing. Created if not exists.
    return this._fs.promises.open(this._config.fuelDataPath, this._fs.constants.R_OK | this._fs.constants.W_OK)
      .then(() => this._fs.promises.readFile(this._config.fuelDataPath))
      .then(fileData => {
        const fuelConsumptionRecords = JSON.parse(fileData);
        if (!Array.isArray(fuelConsumptionRecords)) throw new Error('Parsed object is not an array.');
        return fuelConsumptionRecords;
      })
      .catch(() => {
        // If error occured, we only handle it and update file with only one record.
        this._logger.logTrace('Invalid file format. Saving file with only the newest record.');
        return [];
      })
      .then(fuelConsumptionRecords => {
        fuelConsumptionRecords.push(fuelConsumption);
        return this._fs.promises.writeFile(this._config.fuelDataPath, JSON.stringify(fuelConsumptionRecords, null, 2));
      });
  }
}

module.exports = FuelConsumptionAppender;
