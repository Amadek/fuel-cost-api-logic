var IFuelConsumption = require('./IFuelConsumption');

var FuelConsumptionParser = (function () {
  function FuelConsumptionParser () {}

  FuelConsumptionParser.prototype.parse = function (fuelConsumptionFromRequest) {
    IFuelConsumption.ensureImplemented(fuelConsumptionFromRequest);
    var fuelConsumption = {};
    fuelConsumption.liters = parseFloat(fuelConsumptionFromRequest.liters);
    if (!fuelConsumption.liters) {
      this.parseErrorPropertyName = 'liters';
      return false;
    }

    fuelConsumption.kilometers = parseFloat(fuelConsumptionFromRequest.kilometers);
    if (!fuelConsumption.kilometers) {
      this.parseErrorPropertyName = 'kilometers';
      return false;
    }

    fuelConsumption.fuelPrice = parseFloat(fuelConsumptionFromRequest.fuelPrice);
    if (!fuelConsumption.fuelPrice) {
      this.parseErrorPropertyName = 'fuelPrice';
      return false;
    }

    fuelConsumption.created = fuelConsumptionFromRequest.created;
    this.fuelConsumption = fuelConsumption;
    return true;
  };

  FuelConsumptionParser.prototype.getErrorMessage = function () {
    return 'Parse error: ' + this.parseErrorPropertyName;
  };

  FuelConsumptionParser.prototype.getResult = function () {
    return this.fuelConsumption;
  };

  return FuelConsumptionParser;
}());

module.exports = FuelConsumptionParser;
