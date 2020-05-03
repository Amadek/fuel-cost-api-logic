const Ensure = require('@amadek/js-sdk/Ensure');
import { Db } from 'mongodb';
import { IFuelConsumption } from './IFuelConsumption';
import { ILogger } from './ILogger';

export class FuelConsumptionAppender {
  private readonly _db: Db;
  private readonly _logger: ILogger;
  
  public constructor (db: Db, logger: ILogger) {
    Ensure.notNull(db);
    Ensure.notNull(logger);
    this._db = db;
    this._logger = logger;
  }

  public append (fuelConsumption: IFuelConsumption): Promise<void> {
    return Promise.resolve()
      .then(() => this._db.collection('fuelConsumption').insertOne(fuelConsumption))
      .then(() => this._logger.logEvent('FuelConsumption appended to db.', fuelConsumption));
  }
}
