const Ensure = require('@amadek/js-sdk/Ensure');
import { ITokenValidator } from "./ITokenValidator";
import { ILogger } from '../logic/ILogger';
import { Router } from 'express';
import { FuelConsumptionAppender } from '../logic/FuelConsumptionAppender';
import { FuelConsumptionFinder } from '../logic/FuelConsumptionFinder';
import { FuelConsumptionParser } from '../logic/FuelConsumptionParser';
import createError from 'http-errors';


export class FuelConsumptionController {
  private readonly _db: any;
  private readonly _tokenValidator: ITokenValidator;
  private readonly _logger: ILogger;

  public constructor (db: any, tokenValidator: ITokenValidator, logger: ILogger) {
    Ensure.notNull(db);
    Ensure.notNull(tokenValidator);
    Ensure.notNull(logger);
    this._db = db;
    this._tokenValidator = tokenValidator;
    this._logger = logger;
  }

  public route (router: Router): Router {
    router.post('/', this.postFuelConsumption.bind(this));
    router.get('/', this.getFuelConsumption.bind(this));
    return router;
  }

  public postFuelConsumption (req: any, res: any, next: any) {
    Promise.resolve()
      .then(() => this._validateToken(req))
      .then(() => this._parseFuelConsumption(req.body))
      .then(fuelConsumption => {
        const fuelConsumptionAppender = new FuelConsumptionAppender(this._db, this._logger);
        return fuelConsumptionAppender.append(fuelConsumption);
      })
      // Send status code 'Created'.
      .then(() => res.status(201).end())
      .then(next)
      .catch(next);
  }

  public getFuelConsumption (req: any, res: any, next: any) {
    Promise.resolve()
      .then(() => this._validateToken(req))
      .then(() => {
        const finder = new FuelConsumptionFinder(this._db, this._logger);
        return finder.getAll();
      })
      .then(fuelConsumptions => res.json(fuelConsumptions))
      .then(next)
      .catch(next);
  }

  private _parseFuelConsumption (body: any) {
    const fuelConsumptionFromRequest: any = body;

    const fuelConsumptionParser: FuelConsumptionParser = new FuelConsumptionParser(fuelConsumptionFromRequest);
    if (!fuelConsumptionParser.parse()) {
      throw createError(400, fuelConsumptionParser.errorMessage);
    }

    return fuelConsumptionParser.result;
  }

  private _validateToken (req: any) {
    if (!req.headers.authorization) throw createError(400);

    const token: string = req.headers.authorization.replace('Bearer ', '');
    return this._tokenValidator.validate(token);
  }
}
