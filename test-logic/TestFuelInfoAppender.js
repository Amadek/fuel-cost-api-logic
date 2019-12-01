/* global describe, it */
var assert = require('assert');
var FuelConsumptionAppender = require('../logic/FuelConsumptionAppender');

describe('TestFuelInfoAppnder', function () {
  describe('ctor', function () {
    it('should reject nulls', function () {
      assert.throws(function () { FuelConsumptionAppender(); });
      assert.throws(function () { FuelConsumptionAppender({}); });
      assert.doesNotThrow(function () { FuelConsumptionAppender({}, {}); });
    });

    it('should assign properties', function () {
      // ARRANGE
      var fs = {};
      var config = {};

      // ACT
      var fuelConsumptionAppender = new FuelConsumptionAppender(fs, config);

      // ASSERT
      assert.strictEqual(fuelConsumptionAppender.fs, fs);
      assert.strictEqual(fuelConsumptionAppender.config, config);
    });
  });

  describe('appendLine', function () {
    it('should ensure IFuelConsumption', function () {
      // ARRANGE
      var config = { fuelDataPath: '' };
      var fuelConsumption = {};
      var fs = { appendFile: function () {} };
      var fuelConsumptionAppender = new FuelConsumptionAppender(fs, config);

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

    it('should use fs.appendFile', function () {
      // ARRANGE
      var config = { fuelDataPath: '' };
      var fuelConsumption = {
        liters: 45,
        kilometers: 300,
        fuelPrice: 2,
        created: new Date()
      };
      var appendLineCounter = 0;
      var fs = {};
      fs.appendFile = function () { appendLineCounter++; };
      var fuelConsumptionAppender = new FuelConsumptionAppender(fs, config);

      // ACT
      fuelConsumptionAppender.appendFuelConsumption(fuelConsumption, function () {});

      // ASSERT
      assert.strictEqual(appendLineCounter, 1);
    });
  });
});
