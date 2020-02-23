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
      assert.throws(() => new FuelConsumptionAppender({}, {}));
      const logger = createLogger();
      assert.doesNotThrow(() => new FuelConsumptionAppender({}, logger));
    });
  });

  describe('appendFuelConsumption', () => {
    it('should ensure IFuelConsumption', () => {
      // ARRANGE
      let fuelConsumption = {};
      const db = createDb();
      const logger = createLogger();
      const fuelConsumptionAppender = new FuelConsumptionAppender(db, logger);

      // ACT, ASSERT
      assert.throws(() => fuelConsumptionAppender.append(fuelConsumption));
      fuelConsumption = {
        liters: 45,
        kilometers: 300,
        fuelPrice: 2,
        created: new Date()
      };
      assert.doesNotThrow(() => fuelConsumptionAppender.append(fuelConsumption));
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

function createDb () {
  return {
    collection: () => ({
      insertOne: () => {}
    })
  };
}
