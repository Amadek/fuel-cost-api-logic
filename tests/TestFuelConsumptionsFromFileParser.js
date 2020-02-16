/* global describe, it */
const assert = require('assert');
const FuelConsumptionsFromFileParser = require('../logic/FuelConsumptionsFromFileParser');

describe('TestFuelConsumtpionsFromFileParser', () => {
  describe('parse', () => {
    it('should not parse plain text', () => {
      // ARRANGE
      const fileData = 'Lorem ipsum dolor sit amet';
      const fs = createFs(JSON.stringify(fileData));
      const logger = createLogger();
      const parser = new FuelConsumptionsFromFileParser(fs, '', logger);
      // ACT
      return parser.parse()
        .then(fuelConsumptions => assert.strictEqual(fuelConsumptions.length, 0));
    });

    it('should demand numbers in fields', () => {
      // ARRANGE
      const fileData = [
        {
          liters: 'foo',
          kilometers: 'bar',
          fuelPrice: 'baz',
          created: new Date()
        }
      ];
      const fs = createFs(JSON.stringify(fileData));
      const logger = createLogger();
      const parser = new FuelConsumptionsFromFileParser(fs, '', logger);
      // ACT
      return parser.parse()
        .then(fuelConsumptions => assert.strictEqual(fuelConsumptions.length, 0));
    });

    it('should parse valid data', () => {
      // ARRANGE
      const fileData = [
        {
          liters: 41.5,
          kilometers: 355.8,
          fuelPrice: 4.97,
          created: new Date()
        }
      ];
      const fs = createFs(JSON.stringify(fileData));
      const logger = createLogger();
      const parser = new FuelConsumptionsFromFileParser(fs, '', logger);
      // ACT
      return parser.parse()
        .then(fuelConsumptions => assert.strictEqual(fuelConsumptions.length, 1));
    });

    it('should try parse all even error occured', () => {
      // ARRANGE
      const fileData = [
        {
          liters: 41.5,
          kilometers: 355.8,
          fuelPrice: 4.97,
          created: new Date()
        },
        {
          liters: 'foo',
          kilometers: 'bar',
          fuelPrice: 'baz',
          created: new Date()
        },
        {
          liters: 35.2,
          kilometers: 400.2,
          fuelPrice: 3.6,
          created: new Date()
        }
      ];
      const fs = createFs(JSON.stringify(fileData));
      const logger = createLogger();
      const parser = new FuelConsumptionsFromFileParser(fs, '', logger);
      // ACT
      return parser.parse()
        // ASSERT
        .then(fuelConsumptions => {
          assert.strictEqual(fuelConsumptions.length, 2);
          assert.strictEqual(fuelConsumptions[0].liters, 41.5);
          assert.strictEqual(fuelConsumptions[1].liters, 35.2);
        });
    });

    it('should return empty when cannot access to the file', () => {
      // ARRANGE
      const enoentError = new Error();
      enoentError.code = 'ENOENT';
      const fs = createFs('');
      fs.promises.access = () => Promise.reject(enoentError);
      const logger = createLogger();
      const parser = new FuelConsumptionsFromFileParser(fs, '', logger);
      // ACT
      return parser.parse()
        .then(fuelConsumptions => assert.strictEqual(fuelConsumptions.length, 0));
    });
  });
});

function createLogger () {
  return {
    logEvent: () => {},
    logException: () => {},
    logTrace: () => {}
  };
}

function createFs (fileData) {
  return {
    constants: {},
    promises: {
      access: () => Promise.resolve(),
      readFile: () => Promise.resolve(fileData)
    }
  };
}
