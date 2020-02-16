const config = require('./config')[process.env.NODE_ENV];
const express = require('express');
const helmet = require('helmet');
const IndexController = require('./api/IndexController');
const AppInsightsLogger = require('./api/AppInsightsLogger');
const app = express();
const appInsights = require('applicationinsights');
appInsights.setup(config.appInsights);
appInsights.start();

const logger = new AppInsightsLogger(appInsights.defaultClient);

app.use(helmet());
app.use(express.json());
app.use(new IndexController(config, logger).route(express.Router()));
app.use((req, res, next) => res.status(404).end());
app.listen(config.api.port);
