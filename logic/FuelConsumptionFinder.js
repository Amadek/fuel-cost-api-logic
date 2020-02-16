const Ensure = require('@amadek/js-sdk/Ensure');
const ILogger = require('./ILogger');
const FuelConsumptionsFromFileParser = require('./FuelConsumptionsFromFileParser');

class FuelConsumptionFinder {
  constructor (fs, config, logger) {
    Ensure.notNull(fs);
    Ensure.notNull(config);
    ILogger.ensureImplemented(logger);
    this._fs = fs;
    this._config = config;
    this._logger = logger;
  }

  getAll () {
    const fileParser = new FuelConsumptionsFromFileParser(this._fs, this._config.fuelDataPath, this._logger);
    return fileParser.parse();
  }
}

module.exports = FuelConsumptionFinder;
