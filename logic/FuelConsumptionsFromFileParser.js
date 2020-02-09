const Ensure = require('@amadek/js-sdk/Ensure');
const FuelConsumptionParser = require('./FuelConsumptionParser');

class FuelConsumptionsFromFileParser {
  get errorMessage () { return this._errorMessage; }

  get result () { return this._fuelConsumptions; }

  constructor (fileData) {
    Ensure.typeOf('', fileData);
    this._fileData = fileData;
  }

  parse () {
    let fuelConsumptionRecords = [];
    try {
      fuelConsumptionRecords = JSON.parse(this._fileData);
    } catch {
      this._errorMessage = 'Failed to parse object from file.';
      return false;
    }

    if (!Array.isArray(fuelConsumptionRecords)) {
      this._errorMessage = 'Parsed object is not an array.';
      return false;
    }

    const fuelConsumptions = [];
    let i = 0;
    for (const record of fuelConsumptionRecords) {
      const fuelConsumptionParser = new FuelConsumptionParser(record);
      if (!fuelConsumptionParser.parse()) {
        this._errorMessage = `Object no. ${i}: ${fuelConsumptionParser._errorMessage}`;
        return false;
      }
      fuelConsumptions.push(fuelConsumptionParser.result);
      i++;
    }

    this._fuelConsumptions = fuelConsumptions;
    return true;
  }
}

module.exports = FuelConsumptionsFromFileParser;
