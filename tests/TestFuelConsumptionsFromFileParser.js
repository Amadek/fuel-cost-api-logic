/* global describe, it */
const assert = require('assert');
const FuelConsumptionsFromFileParser = require('../logic/FuelConsumptionsFromFileParser');

describe('TestFuelConsumtpionsFromFileParser', () => {
  describe('parse', () => {
    it('should not parse plain text', () => {
      // ARRANGE
      const fileData = 'Lorem ipsum dolor sit amet';
      const parser = new FuelConsumptionsFromFileParser(fileData);
      // ACT
      const success = parser.parse();
      // ASSERT
      assert.strictEqual(success, false);
    });

    it('should demand numbers in fields', function () {
      // ARRANGE
      const fileData = [
        {
          liters: 'foo',
          kilometers: 'bar',
          fuelPrice: 'baz',
          created: new Date()
        }
      ];
      const parser = new FuelConsumptionsFromFileParser(JSON.stringify(fileData));
      // ACT
      const success = parser.parse();
      // ASSERT
      assert.strictEqual(success, false);
    });

    it('should parse valid data', function () {
      // ARRANGE
      const fileData = [
        {
          liters: 41.5,
          kilometers: 355.8,
          fuelPrice: 4.97,
          created: new Date()
        }
      ];
      const parser = new FuelConsumptionsFromFileParser(JSON.stringify(fileData));
      // ACT
      const success = parser.parse();
      // ASSERT
      assert.strictEqual(success, true);
    });
  });
});
