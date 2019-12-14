/* global describe, it */
var assert = require('assert');
var FuelConsumptionAppender = require('../logic/FuelConsumptionAppender');

describe('UnitTest.TestFuelConsumptionAppender', function () {
  describe('ctor', function () {
    it('should reject nulls', function () {
      assert.throws(function () { FuelConsumptionAppender(); });
      assert.throws(function () { FuelConsumptionAppender({}); });
      assert.doesNotThrow(function () { FuelConsumptionAppender({}, {}); });
    });

    it('should assign properties', function () {
      // ARRANGE
      var fs = {};
      var env = {};

      // ACT
      var fuelConsumptionAppender = new FuelConsumptionAppender(fs, env);

      // ASSERT
      assert.strictEqual(fuelConsumptionAppender.fs, fs);
      assert.strictEqual(fuelConsumptionAppender.env, env);
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
      var fuelConsumptionAppender = new FuelConsumptionAppender(fs, {});

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
      var fuelConsumptionAppender = new FuelConsumptionAppender(fs, {});

      // ACT
      fuelConsumptionAppender.appendFuelConsumption(fuelConsumption, function () {});

      // ASSERT
      assert.strictEqual(appendLineCounter, 1);
    });
  });
});
