var IFuelConsumption = require('./IFuelConsumption');

var FuelConsumptionParser = (function () {
  function FuelConsumptionParser () {}

  FuelConsumptionParser.prototype.parse = function (fuelConsumptionFromRequest) {
    IFuelConsumption.ensureImplemented(fuelConsumptionFromRequest);
    var fuelConsumption = {};
    fuelConsumption.liters = parseFloat(fuelConsumptionFromRequest.liters);
    if (!fuelConsumption.liters) return { success: false, message: 'Parse error: liters' };

    fuelConsumption.kilometers = parseFloat(fuelConsumptionFromRequest.kilometers);
    if (!fuelConsumption.kilometers) return { success: false, message: 'Parse error: kilometers' };

    fuelConsumption.fuelPrice = parseFloat(fuelConsumptionFromRequest.fuelPrice);
    if (!fuelConsumption.fuelPrice) return { success: false, message: 'Parse error: fuelPrice' };

    fuelConsumption.created = fuelConsumptionFromRequest.created;
    return {
      success: true,
      fuelConsumption: fuelConsumption
    };
  };

  return FuelConsumptionParser;
}());

module.exports = FuelConsumptionParser;
