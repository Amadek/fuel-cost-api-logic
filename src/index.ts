const config = require('./config');
import express, { Application } from 'express';
import helmet from 'helmet';
import { ILogger } from './logic/ILogger';
import { IDbConnector } from './logic/IDbConnector';
import { DummyLogger } from './api/DummyLogger';
import { DbConnector } from './logic/DbConnector';
import { DbInitializer } from './logic/DbInitializer';
import { FuelConsumptionController } from './api/FuelConsumptionController';
import { TokenController } from './api/TokenController';
import { TokenValidator } from './api/TokenValidator';

const app: Application = express();
const logger: ILogger = new DummyLogger();
const dbConnector: IDbConnector = new DbConnector(config);

Promise.resolve()
  .then(() => dbConnector.connect())
  .then(db => new DbInitializer(db).initialize())
  .then(db => {
    const tokenValidator: TokenValidator = new TokenValidator(db);
    app.use(helmet());
    app.use(express.json());
    app.use('/fuelConsumption', new FuelConsumptionController(db, tokenValidator, logger).route(express.Router()));
    app.use('/token', new TokenController(db, config).route(express.Router()));
    app.use((req, res, next) => res.status(404).end());
    app.listen(config.api.port, () => console.log(`Listening on ${config.api.port}...`));
  })
  .catch(err => logger.logException(err));
 