var express = require('express');
var app = express();
var config = require('./config');
var IndexController = require('./IndexController');

app.use(new IndexController(config).route(express.Router()));

app.listen(config.port, function () {
  console.log('Listening on ' + config.port + '...');
});
