/* global describe, it */
const assert = require('assert');
const FuelConsumptionParser = require('../logic/FuelConsumptionParser');

describe('TestFuelConsumptionParser', () => {
  describe('parse', () => {
    it('should demand IFuelConsumption', () => {
      // ARRANE
      const fuelConsumptionFromRequest = {};
      const parser = new FuelConsumptionParser(fuelConsumptionFromRequest);
      // ACT
      const success = parser.parse();
      // ASSERT
      assert.strictEqual(success, false);
    });

    it('should parse fuelConsumption', () => {
      // ARRANGE
      const fuelConsumptionFromRequest = {
        liters: '45',
        kilometers: '370',
        fuelPrice: '2.37',
        created: new Date()
      };
      const parser = new FuelConsumptionParser(fuelConsumptionFromRequest);
      // ACT
      const success = parser.parse();
      // ASSERT
      assert.strictEqual(success, true);
      const fuelConsumption = parser.result;
      assert.strictEqual(fuelConsumption.liters, 45);
      assert.strictEqual(fuelConsumption.kilometers, 370);
      assert.strictEqual(fuelConsumption.fuelPrice, 2.37);
      assert.strictEqual(fuelConsumption.created.getTime(), fuelConsumptionFromRequest.created.getTime());
    });

    it('should return falsy result when invalid data', () => {
      // ARRANGE
      const fuelConsumptionFromRequest = {
        liters: 'foo',
        kilometers: 'bar',
        fuelPrice: 'baz',
        created: new Date()
      };
      let parser = new FuelConsumptionParser(fuelConsumptionFromRequest);
      // ACT, ASSERT
      // Invalid liters.
      let success = parser.parse();
      assert.strictEqual(success, false);

      // Invalid kilometers.
      fuelConsumptionFromRequest.liters = '42.5';
      parser = new FuelConsumptionParser(fuelConsumptionFromRequest);
      success = parser.parse();
      assert.strictEqual(success, false);

      // Invalid fuelPrice.
      fuelConsumptionFromRequest.kilometers = '377,8';
      parser = new FuelConsumptionParser(fuelConsumptionFromRequest);
      success = parser.parse();
      assert.strictEqual(success, false);

      // Correct data.
      fuelConsumptionFromRequest.fuelPrice = '2.37';
      parser = new FuelConsumptionParser(fuelConsumptionFromRequest);
      success = parser.parse();
      assert.strictEqual(success, true);
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
