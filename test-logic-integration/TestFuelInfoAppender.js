/* global describe, it, assert */
var fs = require('fs');
var config = require('./config');
var FuelConsumptionAppender = require('../logic/FuelConsumptionAppender');

describe('TestFuelConsumptionAppender', function () {
  describe('AppendFuelConsumption', function () {
    it('should create a new file when not exists', function () {
      // ARRANGE
      var fuelConsumption = {
        liters: 34,
        kilometers: 350,
        fuelPrice: 2,
        created: new Date()
      };

      // ACT, ASSERT
      fs.unlink(config.fuelDataPath, function () {
        var fuelConsumptionAppender = new FuelConsumptionAppender(fs, config);
        fuelConsumptionAppender.appendFuelConsumption(fuelConsumption, function () {
          fs.readFile(config.fuelDataPath, function (err, fileData) {
            if (err) {
              throw err;
            }

            var fuelConsumptionRecords = JSON.parse(fileData);
            assert.strictEqual(fuelConsumptionRecords.length, 1);
            assert.strictEqual(fuelConsumptionRecords[0].liters, fuelConsumption.liters);
            assert.strictEqual(fuelConsumptionRecords[0].kilometers, fuelConsumption.kilometers);
            assert.strictEqual(fuelConsumptionRecords[0].fuelPrice, fuelConsumption.fuelPrice);
            assert.strictEqual(fuelConsumptionRecords[0].created, fuelConsumption.created);
          });
        });
      });
    });

    it('should append file when exists', function () {
      // ARRANGE
      var fuelConsumption = {
        liters: 34,
        kilometers: 350,
        fuelPrice: 2,
        created: new Date()
      };
      // ACT, ASSERT
      fs.unlink(config.fuelDataPath, function () {
        fs.appendFile(config.fuelDataPath, '', function () {
          var fuelConsumptionAppender = new FuelConsumptionAppender(fs, config);
          fuelConsumptionAppender.appendFuelConsumption(fuelConsumption, function () {
            fs.readFile(config.fuelDataPath, function (err, fileData) {
              if (err) {
                throw err;
              }
              var fuelConsumptionRecords = JSON.parse(fileData);
              assert.strictEqual(fuelConsumptionRecords.length, 1);
              assert.strictEqual(fuelConsumptionRecords[0].liters, fuelConsumption.liters);
              assert.strictEqual(fuelConsumptionRecords[0].kilometers, fuelConsumption.kilometers);
              assert.strictEqual(fuelConsumptionRecords[0].fuelPrice, fuelConsumption.fuelPrice);
              assert.strictEqual(fuelConsumptionRecords[0].created, fuelConsumption.created);
            });
          });
        });
      });
    });
  });
});
