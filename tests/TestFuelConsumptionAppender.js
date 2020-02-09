/* global describe, it */
const assert = require('assert');
const FuelConsumptionAppender = require('../logic/FuelConsumptionAppender');

describe('TestFuelConsumptionAppender', () => {
  describe('ctor', () => {
    it('should reject nulls', () => {
      assert.throws(() => new FuelConsumptionAppender());
      assert.throws(() => new FuelConsumptionAppender({}));
      assert.throws(() => new FuelConsumptionAppender({}, {}));
    });

    it('should demand ILogger', () => {
      assert.throws(() => new FuelConsumptionAppender({}, {}, {}));
      const logger = createLogger();
      assert.doesNotThrow(() => new FuelConsumptionAppender({}, {}, logger));
    });
  });

  describe('appendFuelConsumption', () => {
    it('should ensure IFuelConsumption', () => {
      // ARRANGE
      let fuelConsumption = {};
      const fs = createFs();
      const logger = createLogger();
      const fuelConsumptionAppender = new FuelConsumptionAppender(fs, {}, logger);

      // ACT, ASSERT
      assert.throws(() => fuelConsumptionAppender.appendFuelConsumption(fuelConsumption, () => {}));
      fuelConsumption = {
        liters: 45,
        kilometers: 300,
        fuelPrice: 2,
        created: new Date()
      };
      assert.doesNotThrow(() => fuelConsumptionAppender.appendFuelConsumption(fuelConsumption, () => {}));
    });

    it('should use fs.open', () => {
      // ARRANGE
      const fuelConsumption = {
        liters: 45,
        kilometers: 300,
        fuelPrice: 2,
        created: new Date()
      };
      let fsOpenCounter = 0;
      const fs = createFs();
      fs.promises.open = () => new Promise(() => fsOpenCounter++);
      const logger = createLogger();
      const fuelConsumptionAppender = new FuelConsumptionAppender(fs, {}, logger);

      // ACT
      fuelConsumptionAppender.appendFuelConsumption(fuelConsumption, () => {});

      // ASSERT
      assert.strictEqual(fsOpenCounter, 1);
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

function createFs () {
  return {
    constants: {},
    promises: { open: () => new Promise(() => {}) }
  };
}
