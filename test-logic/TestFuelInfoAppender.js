/* global describe, it */
var assert = require('assert');
var FuelConsumptionAppender = require('../logic/FuelConsumptionAppender');

describe('TestFuelInfoAppnder', function () {
  describe('appendLine', function () {
    it('should use fs.appendFile', function () {
      // ARRANGE
      var config = { fuelDataPath: 'foo.txt' };
      var appendLineCounter = 0;
      var fs = {};
      fs.appendFile = function (fileName, data, callback) {
        appendLineCounter++;
      };
      var fuelConsumptionAppender = new FuelConsumptionAppender(fs, config);
      // ACT
      fuelConsumptionAppender.appendFuelConsumption({}, function () {});
      // ASSERT
      assert.strictEqual(appendLineCounter, 1);
    });
  });
});
