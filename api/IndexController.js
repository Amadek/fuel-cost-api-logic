var fs = require('fs');
var FuelConsumptionAppender = require('../logic/FuelConsumptionAppender');

var IndexController = (function () {
  function IndexController (expressApp, config) {
    var fuelConsumptionAppender = new FuelConsumptionAppender(fs, config);
    expressApp.get('/', onIndex);
    expressApp.get('/add/liters/:liters(\\d+)/kilometers/:kilometers(\\d+)/fuelPrice/:fuelPrice(\\d+)', onPutFuelData);
    expressApp.listen(config.port, onListen);

    function onIndex (req, res) {
      res.send('ACTIVE');
    }

    function onPutFuelData (req, res) {
      var fuelConsumption = {
        liters: req.params.liters,
        kilometers: req.params.kilometers,
        fuelPrice: req.params.fuelPrice,
        created: new Date()
      };

      fuelConsumptionAppender.appendFuelConsumption(fuelConsumption, function () { onFuelConsumptionAppended(req, res); });
    }

    function onFuelConsumptionAppended (req, res) {
      res.send('OK');
    }

    function onListen () {
      console.log('Listening on ' + config.port + '...');
    }
  }

  return IndexController;
}());

module.exports = IndexController;
