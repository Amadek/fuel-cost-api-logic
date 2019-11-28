
var FuelInfoAppender = (function() {

    function FuelInfoAppender(fs, config) {
        this.config = config;
        this.fs = fs;
    }

    FuelInfoAppender.prototype.appendFuelInfo = function(fuelInfo, callback) {
        this.fs.appendFile(this.config.fuelDataPath, fuelInfo + '\n', callback);
    };

    return FuelInfoAppender;
}());

module.exports = FuelInfoAppender;