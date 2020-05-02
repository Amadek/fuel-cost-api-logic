const Ensure = require('@amadek/js-sdk/Ensure');
const ILogger = require('./ILogger');

class FuelConsumptionFinder {
  constructor (db, logger) {
    Ensure.notNull(db);
    ILogger.ensureImplemented(logger);
    this._db = db;
    this._logger = logger;
  }

  getAll () {
    return Promise.resolve()
      .then(() => this._db.collection('fuelConsumption').find({}).toArray())
      .then(fuelConsumptions => {
        this._logger.logEvent('Returned all fuelConsumptions.');
        return fuelConsumptions;
      });
  }
}

module.exports = FuelConsumptionFinder;
