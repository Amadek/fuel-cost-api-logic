var IFuelConsumption = require('./IFuelConsumption');

var FuelConsumptionParser = (function () {
  function FuelConsumptionParser () {}

  FuelConsumptionParser.prototype.parseFromRequest = function (fuelConsumptionFromRequest) {
    try {
      IFuelConsumption.ensureImplemented(fuelConsumptionFromRequest);
    } catch {
      return { success: false, message: 'Object does not have all required properties.' };
    }

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

  FuelConsumptionParser.prototype.parseFromFile = function (fileData) {
    try {
      var fuelConsumptionRecords = JSON.parse(fileData);
    } catch (err) {
      return { success: false, message: 'Parse error: Failed to parse the file.' };
    }
    var parsedFuelConsumptionRecords = [];
    var self = this;
    fuelConsumptionRecords.forEach(function (record) {
      var result = self.parseFromRequest(record);
      if (!result.success) {
        return result;
      }
      parsedFuelConsumptionRecords.push(result.fuelConsumption);
    });
    return { success: true, fuelConsumptionRecords: parsedFuelConsumptionRecords };
  };

  return FuelConsumptionParser;
}());

module.exports = FuelConsumptionParser;
