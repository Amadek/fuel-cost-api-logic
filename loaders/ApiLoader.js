var Ensure = require('@amadek/js-sdk/Ensure');
var express = require('express');
var IndexController = require('../api/IndexController');

var ApiLoader = (function () {
  function ApiLoader (config) {
    Ensure.notNull(config);
    this.config = config;
  }

  ApiLoader.prototype.load = function () {
    // If we should not run API, we do nothing.
    if (!this.config.api.shouldRun) {
      return;
    }

    var app = express();

    app.use(express.json());
    app.use(new IndexController(this.config).route(express.Router()));

    var self = this;

    app.listen(this.config.api.port, function () {
      console.log('Listening on ' + self.config.api.port + '...');
    });
  };

  return ApiLoader;
}());

module.exports = ApiLoader;
