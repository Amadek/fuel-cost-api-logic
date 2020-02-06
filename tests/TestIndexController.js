/* global describe, it, before, afterEach */
var config = require('../config');
var assert = require('assert');
var fs = require('fs');
var path = require('path');
var IndexController = require('../api/IndexController');

describe('TestIndexController', function () {
  describe('postFuelConsumption', function () {
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
      var req = { body: fuelConsumption };
      var res = createResponse();
      var logger = createLogger();
      var indexController = new IndexController(config, logger);
      // ACT
      indexController.postFuelConsumption(req, res, function (err) {
        if (err) return done(err);
        fs.readFile(config.fuelDataPath, function (err, fileData) {
          if (err) return done(err);
          // ASSERT
          var fuelConsumptionRecords = JSON.parse(fileData);
          assert.strictEqual(fuelConsumptionRecords.length, 1);
          assert.strictEqual(fuelConsumptionRecords[0].liters, fuelConsumption.liters);
          assert.strictEqual(fuelConsumptionRecords[0].kilometers, fuelConsumption.kilometers);
          assert.strictEqual(fuelConsumptionRecords[0].fuelPrice, fuelConsumption.fuelPrice);
          done();
        });
      });
    });

    it('should append file when exists', function (done) {
      // ARRANGE
      var fuelConsumption0 = createFuelConsumption();
      var fuelConsumption1 = createFuelConsumption();
      var req0 = { body: fuelConsumption0 };
      var req1 = { body: fuelConsumption1 };
      var res = createResponse();
      var logger = createLogger();
      var indexController = new IndexController(config, logger);
      // ACT
      indexController.postFuelConsumption(req0, res, function (err) {
        if (err) return done(err);
        indexController.postFuelConsumption(req1, res, function (err) {
          if (err) return done(err);
          fs.readFile(config.fuelDataPath, function (err, fileData) {
            if (err) return done(err);
            // ASSERT
            var fuelConsumptionRecords = JSON.parse(fileData);
            assert.strictEqual(fuelConsumptionRecords.length, 2);
            assert.strictEqual(fuelConsumptionRecords[1].liters, fuelConsumption1.liters);
            assert.strictEqual(fuelConsumptionRecords[1].kilometers, fuelConsumption1.kilometers);
            assert.strictEqual(fuelConsumptionRecords[1].fuelPrice, fuelConsumption1.fuelPrice);
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

function createResponse () {
  return {
    send: function () {},
    status: function () { return { end: function () {} }; }
  };
}

function createLogger () {
  return {
    logEvent: function () {},
    logException: function () {},
    logTrace: function () {}
  };
}
