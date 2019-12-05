/* global describe, it */
var assert = require('assert');
var FuelConsumptionParser = require('../logic/FuelConsumptionParser');

describe('TestFuelConsumptionParser', function () {
  describe('parse', function () {
    it('should demand IFuelConsumption', function () {
      // ARRANE
      var fuelConsumptionFromRequest = {};
      var parser = new FuelConsumptionParser();
      // ACT
      assert.throws(function () { parser.parse(fuelConsumptionFromRequest); });
    });

    it('should parse fuelConsumption', function () {
      // ARRANGE
      var fuelConsumptionFromRequest = {
        liters: '45',
        kilometers: '370',
        fuelPrice: '2.37',
        created: new Date()
      };
      var parser = new FuelConsumptionParser();
      // ACT
      var result = parser.parse(fuelConsumptionFromRequest);
      // ASSERT
      assert.strictEqual(result.success, true);
      var fuelConsumption = result.fuelConsumption;
      assert.strictEqual(fuelConsumption.liters, 45);
      assert.strictEqual(fuelConsumption.kilometers, 370);
      assert.strictEqual(fuelConsumption.fuelPrice, 2.37);
      assert.strictEqual(fuelConsumption.created.getTime(), fuelConsumptionFromRequest.created.getTime());
    });

    it('should return falsy result when invalid data', function () {
      // ARRANGE
      var fuelConsumptionFromRequest = {
        liters: 'foo',
        kilometers: 'bar',
        fuelPrice: 'baz',
        created: new Date()
      };
      var parser = new FuelConsumptionParser();
      // ACT, ASSERT
      // Invalid liters.
      var result = parser.parse(fuelConsumptionFromRequest);
      assert.strictEqual(false, result.success);

      // Invalid kilometers.
      fuelConsumptionFromRequest.liters = '42.5';
      result = parser.parse(fuelConsumptionFromRequest);
      assert.strictEqual(false, result.success);

      // Invalid fuelPrice.
      fuelConsumptionFromRequest.kilometers = '377,8';
      result = parser.parse(fuelConsumptionFromRequest);
      assert.strictEqual(false, result.success);

      // Correct data.
      fuelConsumptionFromRequest.fuelPrice = '2.37';
      result = parser.parse(fuelConsumptionFromRequest);
      assert.strictEqual(true, result.success);
    });
  });
});
