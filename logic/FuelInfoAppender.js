var fs = require('fs');

var FuelInfoAppender = (function() {

    function FuelInfoAppender() {}

    FuelInfoAppender.prototype.append = function(fuelInfo, callback) {
        fs.appendFile('FuelData.txt', fuelInfo + '\n', callback);
    };

    return FuelInfoAppender;
}());

module.exports = FuelInfoAppender;