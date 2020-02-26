const config = require('./config');
const express = require('express');
const helmet = require('helmet');
const DummyLogger = require('./api/DummyLogger');
const DbConnector = require('./logic/DbConnector');
const FuelConsumptionController = require('./api/FuelConsumptionController');
const AuthController = require('./api/AuthController');
const app = express();

const logger = new DummyLogger();
const dbConnector = new DbConnector(config);

app.use(helmet());
app.use(express.json());
app.use('/fuelConsumption', new FuelConsumptionController(dbConnector, config, logger).route(express.Router()));
app.use('/auth', new AuthController(config).route(express.Router()));
app.use((req, res, next) => res.status(404).end());
app.listen(config.api.port);
