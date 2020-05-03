const Ensure = require('@amadek/js-sdk/Ensure');
import { ILogger } from './ILogger';
import { Db } from 'mongodb';
import { IFuelConsumption } from './IFuelConsumption';


export class FuelConsumptionFinder {
  private readonly _db: Db;
  private readonly _logger: ILogger;

  public constructor (db: Db, logger: ILogger) {
    Ensure.notNull(db);
    Ensure.notNull(logger);
    this._db = db;
    this._logger = logger;
  }

  public getAll (): Promise<IFuelConsumption[]> {
    return Promise.resolve()
      .then(() => this._db.collection('fuelConsumption').find({}).toArray())
      .then(fuelConsumptions => {
        this._logger.logEvent('Returned all fuelConsumptions.', {});
        return fuelConsumptions as IFuelConsumption[];
      });
  }
}
