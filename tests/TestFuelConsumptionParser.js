/* global describe, it */
var assert = require('assert');
var FuelConsumptionParser = require('../logic/FuelConsumptionParser');

describe('TestFuelConsumptionParser', function () {
  describe('parseFromRequest', function () {
    it('should demand IFuelConsumption', function () {
      // ARRANE
      var fuelConsumptionFromRequest = {};
      var parser = new FuelConsumptionParser();
      // ACT
      var result = parser.parseFromRequest(fuelConsumptionFromRequest);
      // ASSERT
      assert.strictEqual(result.success, false);
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
      var result = parser.parseFromRequest(fuelConsumptionFromRequest);
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
      var result = parser.parseFromRequest(fuelConsumptionFromRequest);
      assert.strictEqual(false, result.success);

      // Invalid kilometers.
      fuelConsumptionFromRequest.liters = '42.5';
      result = parser.parseFromRequest(fuelConsumptionFromRequest);
      assert.strictEqual(false, result.success);

      // Invalid fuelPrice.
      fuelConsumptionFromRequest.kilometers = '377,8';
      result = parser.parseFromRequest(fuelConsumptionFromRequest);
      assert.strictEqual(false, result.success);

      // Correct data.
      fuelConsumptionFromRequest.fuelPrice = '2.37';
      result = parser.parseFromRequest(fuelConsumptionFromRequest);
      assert.strictEqual(true, result.success);
    });
  });

  describe('parseFromFile', function () {
    it('should not parse plain text', function () {
      // ARRANGE
      var fileData = 'Lorem ipsum dolor sit amet';
      var parser = new FuelConsumptionParser();
      // ACT
      var result = parser.parseFromFile(fileData);
      // ASSERT
      assert.strictEqual(result.success, false);
    });

    it('should demand implementing IFuelConsumption', function () {
      // ARRANGE
      var fileData = [
        {
          foo: 'foo',
          bar: 'bar'
        }
      ];
      var parser = new FuelConsumptionParser();
      // ACT
      var result = parser.parseFromFile(JSON.stringify(fileData));
      // ASSERT
      assert.strictEqual(result.success, false);
    });

    it('should demand numbers in fields', function () {
      // ARRANGE
      var fileData = [
        {
          liters: 'foo',
          kilometers: 'bar',
          fuelPrice: 'baz',
          created: new Date()
        }
      ];
      var parser = new FuelConsumptionParser();
      // ACT
      var result = parser.parseFromFile(JSON.stringify(fileData));
      // ASSERT
      assert.strictEqual(result.success, false);
    });

    it('should parse valid data', function () {
      // ARRANGE
      var fileData = [
        {
          liters: 41.5,
          kilometers: 355.8,
          fuelPrice: 4.97,
          created: new Date()
        }
      ];
      var parser = new FuelConsumptionParser();
      // ACT
      var result = parser.parseFromFile(JSON.stringify(fileData));
      // ASSERT
      assert.strictEqual(result.success, true);
    });
  });
});
