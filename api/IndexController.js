var fs = require('fs');
var FuelInfoAppender = require('../logic/FuelInfoAppender');

var IndexController = (function() {

    function IndexController(expressApp, config) {
        
        var fuelInfoAppender = new FuelInfoAppender(fs, config);

        expressApp.get('/', onIndex);
        expressApp.get('/:number(\\d+)', onPutNumber);
        expressApp.listen(config.port, onListen);

        function onIndex(req, res) {
            res.send('ACTIVE');
        }

        function onPutNumber(req, res) {
            fuelInfoAppender.appendFuelInfo(req.params.number, function() { onFuelInfoAppended(req, res); });
        }

        function onFuelInfoAppended(req, res) {
            res.send('OK');
        }

        function onListen() {
            console.log('Listening on ' + config.port + '...');
        }
    }

    return IndexController;
}());

module.exports = IndexController;