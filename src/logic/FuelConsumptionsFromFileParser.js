const Ensure = require('@amadek/js-sdk/Ensure');
const ILogger = require('./ILogger');
const FuelConsumptionParser = require('./FuelConsumptionParser');

class FuelConsumptionsFromFileParser {
  constructor (fs, fuelDataPath, logger) {
    Ensure.notNull(fs);
    Ensure.typeOf('', fuelDataPath);
    ILogger.ensureImplemented(logger);
    this._fs = fs;
    this._fuelDataPath = fuelDataPath;
    this._logger = logger;
  }

  parse () {
    return Promise.resolve()
      .then(() => this._fs.promises.readFile(this._fuelDataPath, { encoding: 'utf8' }))
      .then(fileData => {
        const fuelConsumptionRecords = this._parseFileData(fileData);
        const [fuelConsumptions, objectsWithError] = this._parseFuelConsumptionRecords(fuelConsumptionRecords);

        if (objectsWithError.length > 0) {
          this._logger.logEvent('Failed to parse objects from file', objectsWithError);
        }

        return fuelConsumptions;
      })
      .catch(err => {
        if (err.code !== 'ENOENT') throw err;
        this._logger.logEvent(`Could not access to the ${this._fuelDataPath}.`);
        return [];
      });
  }

  _parseFileData (fileData) {
    // Try parse from file.
    let fuelConsumptionRecords = [];
    try {
      fuelConsumptionRecords = JSON.parse(fileData);
    } catch {
      this._logger.logEvent('Failed to parse object from file.');
    }
    return fuelConsumptionRecords;
  }

  _parseFuelConsumptionRecords (fuelConsumptionRecords) {
    const fuelConsumptions = [];
    const objectsWithError = [];

    for (let i = 0; i < fuelConsumptionRecords.length; i++) {
      // Try parse JSON to FuelConsumption.
      const fuelConsumptionParser = new FuelConsumptionParser(fuelConsumptionRecords[i]);
      // If parse failed, add object to an array for error message.
      if (!fuelConsumptionParser.parse()) {
        objectsWithError.push({
          number: i,
          object: fuelConsumptionRecords[i],
          errorMessage: fuelConsumptionParser.errorMessage
        });
        continue;
      }
      // If success add parsed object to an array for result.
      fuelConsumptions.push(fuelConsumptionParser.result);
    }

    return [fuelConsumptions, objectsWithError];
  }
}

module.exports = FuelConsumptionsFromFileParser;
