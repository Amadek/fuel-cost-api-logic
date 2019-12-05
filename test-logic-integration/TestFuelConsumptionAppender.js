/* global describe, it, before, afterEach */
var assert = require('assert');
var fs = require('fs');
var path = require('path');
var config = require('./config');
var FuelConsumptionAppender = require('../logic/FuelConsumptionAppender');

describe('Integration.TestFuelConsumptionAppender', function () {
  describe('appendFuelConsumption', function () {
    before(function () {
      fs.mkdir(path.dirname(config.fuelDataPath), function () {
        fs.unlink(config.fuelDataPath, function () {});
      });
    });

    afterEach(function () {
      fs.unlink(config.fuelDataPath, function () {});
    });

    it('should create a new file when not exists', function (done) {
      // ARRANGE
      var fuelConsumption = createFuelConsumption();
      var fuelConsumptionAppender = new FuelConsumptionAppender(fs, config);
      // ACT
      fuelConsumptionAppender.appendFuelConsumption(fuelConsumption, function () {
        fs.readFile(config.fuelDataPath, function (err, fileData) {
          if (err) return done(err);
          // ASSERT
          var fuelConsumptionRecords = JSON.parse(fileData);
          assert.strictEqual(fuelConsumptionRecords.length, 1);
          assert.strictEqual(fuelConsumptionRecords[0].liters, fuelConsumption.liters);
          assert.strictEqual(fuelConsumptionRecords[0].kilometers, fuelConsumption.kilometers);
          assert.strictEqual(fuelConsumptionRecords[0].fuelPrice, fuelConsumption.fuelPrice);
          assert.strictEqual(new Date(fuelConsumptionRecords[0].created).getTime(), fuelConsumption.created.getTime());
          done();
        });
      });
    });

    it('should append file when exists', function (done) {
      // ARRANGE
      var fuelConsumption0 = createFuelConsumption();
      var fuelConsumption1 = createFuelConsumption();
      var fuelConsumptionAppender = new FuelConsumptionAppender(fs, config);
      // ACT
      fuelConsumptionAppender.appendFuelConsumption(fuelConsumption0, function () {
        fuelConsumptionAppender.appendFuelConsumption(fuelConsumption1, function () {
          fs.readFile(config.fuelDataPath, function (err, fileData) {
            if (err) return done(err);
            // ASSERT
            var fuelConsumptionRecords = JSON.parse(fileData);
            assert.strictEqual(fuelConsumptionRecords.length, 2);
            assert.strictEqual(fuelConsumptionRecords[1].liters, fuelConsumption1.liters);
            assert.strictEqual(fuelConsumptionRecords[1].kilometers, fuelConsumption1.kilometers);
            assert.strictEqual(fuelConsumptionRecords[1].fuelPrice, fuelConsumption1.fuelPrice);
            assert.strictEqual(new Date(fuelConsumptionRecords[1].created).getTime(), fuelConsumption1.created.getTime());
            done();
          });
        });
      });
    });
  });
});

function createFuelConsumption () {
  return {
    liters: Math.floor(Math.random() * 10 + 30),
    kilometers: Math.floor(Math.random() * 50 + 300),
    fuelPrice: Math.floor(Math.random() * 2 + 1),
    created: new Date()
  };
}
