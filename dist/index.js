"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config = require('./config');
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const DummyLogger_1 = require("./api/DummyLogger");
const DbConnector_1 = require("./logic/DbConnector");
const DbInitializer_1 = require("./logic/DbInitializer");
const FuelConsumptionController_1 = require("./api/FuelConsumptionController");
const TokenController_1 = require("./api/TokenController");
const TokenValidator_1 = require("./api/TokenValidator");
const app = express_1.default();
const logger = new DummyLogger_1.DummyLogger();
const dbConnector = new DbConnector_1.DbConnector(config);
Promise.resolve()
    .then(() => dbConnector.connect())
    .then(db => new DbInitializer_1.DbInitializer(db).initialize())
    .then(db => {
    const tokenValidator = new TokenValidator_1.TokenValidator(db);
    app.use(helmet_1.default());
    app.use(express_1.default.json());
    app.use('/fuelConsumption', new FuelConsumptionController_1.FuelConsumptionController(db, tokenValidator, logger).route(express_1.default.Router()));
    app.use('/token', new TokenController_1.TokenController(db, config).route(express_1.default.Router()));
    app.use((req, res, next) => res.status(404).end());
    app.listen(config.api.port, () => console.log(`Listening on ${config.api.port}...`));
})
    .catch(err => logger.logException(err));
//# sourceMappingURL=index.js.map