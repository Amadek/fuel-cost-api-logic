var config = require('./config');
var express = require('express');
var IndexController = require('./api/IndexController');
var AppInsightsLogger = require('./api/AppInsightsLogger');
var app = express();
var appInsights = require('applicationinsights');
appInsights.setup(config.appInsights);
appInsights.start();
var logger = new AppInsightsLogger(appInsights.defaultClient);

app.use(express.json());
app.use(new IndexController(config, logger).route(express.Router()));
app.listen(config.api.port);
