var fs = require('fs');
var FuelInfoAppender = require('../logic/FuelInfoAppender');

var IndexController = (function () {
  function IndexController (expressApp, config) {
    var fuelInfoAppender = new FuelInfoAppender(fs, config);
    expressApp.get('/', onIndex);
    expressApp.get('/add/liters/:liters(\\d+)/kiloMeters/:kiloMeters(\\d+)/forLiter/:forLiter(\\d+)', onPutNumber);
    expressApp.listen(config.port, onListen);

    function onIndex (req, res) {
      res.send('ACTIVE');
    }

    function onPutNumber (req, res) {
      var fuelInfo = {
        liters: req.params.liters,
        kiloMeters: req.params.kiloMeters,
        forLiter: req.params.forLiter
      };

      fuelInfoAppender.appendFuelInfo(fuelInfo, function () { onFuelInfoAppended(req, res); });
    }

    function onFuelInfoAppended (req, res) {
      res.send('OK');
    }

    function onListen () {
      console.log('Listening on ' + config.port + '...');
    }
  }

  return IndexController;
}());

module.exports = IndexController;
