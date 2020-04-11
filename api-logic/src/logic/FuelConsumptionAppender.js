const Ensure = require('@amadek/js-sdk/Ensure');
const IFuelConsumption = require('./IFuelConsumption');
const ILogger = require('./ILogger');

class FuelConsumptionAppender {
  constructor (db, logger) {
    Ensure.notNull(db);
    ILogger.ensureImplemented(logger);
    this._db = db;
    this._logger = logger;
  }

  append (fuelConsumption) {
    IFuelConsumption.ensureImplemented(fuelConsumption);
    return Promise.resolve()
      .then(() => this._db.collection('fuelConsumption').insertOne(fuelConsumption))
      .then(() => this._logger.logEvent('FuelConsumption appended to db.', fuelConsumption));
  }
}

module.exports = FuelConsumptionAppender;
