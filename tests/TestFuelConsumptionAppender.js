/* global describe, it */
var assert = require('assert');
var FuelConsumptionAppender = require('../logic/FuelConsumptionAppender');

describe('UnitTest.TestFuelConsumptionAppender', function () {
  describe('ctor', function () {
    it('should reject nulls', function () {
      assert.throws(function () { FuelConsumptionAppender(); });
      assert.throws(function () { FuelConsumptionAppender({}); });
      assert.throws(function () { FuelConsumptionAppender({}, {}); });
    });

    it('should demand ILogger', function () {
      assert.throws(function () { FuelConsumptionAppender({}, {}, {}); });
      var logger = createLogger();
      assert.doesNotThrow(function () { FuelConsumptionAppender({}, {}, logger); });
    });

    it('should assign properties', function () {
      // ARRANGE
      var fs = {};
      var config = {};
      var logger = createLogger();

      // ACT
      var fuelConsumptionAppender = new FuelConsumptionAppender(fs, config, logger);

      // ASSERT
      assert.strictEqual(fuelConsumptionAppender.fs, fs);
      assert.strictEqual(fuelConsumptionAppender.config, config);
    });
  });

  describe('appendFuelConsumption', function () {
    it('should ensure IFuelConsumption', function () {
      // ARRANGE
      var fuelConsumption = { };
      var fs = {
        constants: { F_OK: 1 },
        access: function () {}
      };
      var logger = createLogger();
      var fuelConsumptionAppender = new FuelConsumptionAppender(fs, {}, logger);

      // ACT, ASSERT
      assert.throws(function () { fuelConsumptionAppender.appendFuelConsumption(fuelConsumption, function () {}); });
      fuelConsumption = {
        liters: 45,
        kilometers: 300,
        fuelPrice: 2,
        created: new Date()
      };
      assert.doesNotThrow(function () { fuelConsumptionAppender.appendFuelConsumption(fuelConsumption, function () {}); });
    });

    it('should use fs.access', function () {
      // ARRANGE
      var fuelConsumption = {
        liters: 45,
        kilometers: 300,
        fuelPrice: 2,
        created: new Date()
      };
      var appendLineCounter = 0;
      var fs = { constants: { F_OK: 1 } };
      fs.access = function () { appendLineCounter++; };
      var logger = createLogger();
      var fuelConsumptionAppender = new FuelConsumptionAppender(fs, {}, logger);

      // ACT
      fuelConsumptionAppender.appendFuelConsumption(fuelConsumption, function () {});

      // ASSERT
      assert.strictEqual(appendLineCounter, 1);
    });
  });
});

function createLogger () {
  return {
    logEvent: function () {},
    logException: function () {},
    logTrace: function () {}
  };
}
