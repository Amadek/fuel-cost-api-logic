var config = require('./config');
var express = require('express');
var IndexController = require('./api/IndexController');
var app = express();
var appInsights = require('applicationinsights');
appInsights.setup(config.appInsights);
appInsights.start();

app.use(express.json());
app.use(new IndexController(config, appInsights.defaultClient).route(express.Router()));

app.listen(config.api.port, function () {
  console.log('Listening on ' + config.api.port + '...');
});
