const config = require('./config');
const express = require('express');
const helmet = require('helmet');
const DummyLogger = require('./api/DummyLogger');
const DbConnector = require('./logic/DbConnector');
const DbInitializer = require('./logic/DbInitializer');
const FuelConsumptionController = require('./api/FuelConsumptionController');
const TokenController = require('./api/TokenController');
const TokenValidator = require('./api/TokenValidator');
const app = express();

const logger = new DummyLogger();
const dbConnector = new DbConnector(config);

Promise.resolve()
  .then(() => dbConnector.connect())
  .then(db => new DbInitializer(db, config).initialize())
  .then(db => {
    const tokenValidator = new TokenValidator(db);
    app.use(helmet());
    app.use(express.json());
    app.use('/fuelConsumption', new FuelConsumptionController(db, config, tokenValidator, logger).route(express.Router()));
    app.use('/token', new TokenController(db, config).route(express.Router()));
    app.use((req, res, next) => res.status(404).end());
    app.listen(config.api.port, () => console.log(`Listening on ${config.api.port}...`));
  })
  .catch(err => logger.logException(err));
