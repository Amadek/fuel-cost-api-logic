const IFuelConsumption = require('./IFuelConsumption');

class FuelConsumptionParser {
  get errorMessage () { return 'Parse error: ' + this._errorMessage; }

  get result () { return this._fuelConsumption; }

  constructor (fuelConsumptionFromRequest) {
    this._fuelConsumption = fuelConsumptionFromRequest;
  }

  parse () {
    if (!IFuelConsumption.isImplemented(this._fuelConsumption)) {
      this._errorMessage = 'not all required properties';
      return false;
    }

    const fuelConsumption = {};
    fuelConsumption.liters = parseFloat(this._fuelConsumption.liters);
    if (!fuelConsumption.liters) {
      this._errorMessage = 'invalid liters';
      return false;
    }

    fuelConsumption.kilometers = parseFloat(this._fuelConsumption.kilometers);
    if (!fuelConsumption.kilometers) {
      this._errorMessage = 'invalid kilometers';
      return false;
    }

    fuelConsumption.fuelPrice = parseFloat(this._fuelConsumption.fuelPrice);
    if (!fuelConsumption.fuelPrice) {
      this._errorMessage = 'invalid fuelPrice';
      return false;
    }

    fuelConsumption.created = this._fuelConsumption.created;
    this._fuelConsumption = fuelConsumption;
    return true;
  }

  parseFromFile (fileData) {
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
  }
}

module.exports = FuelConsumptionParser;
