/* global describe, it, before, afterEach */
const config = require('../config')[process.env.NODE_ENV];
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const IndexController = require('../api/IndexController');

console.log(process.env.NODE_ENV);

describe('TestIndexController', () => {
  describe('postFuelConsumption', () => {
    before(() => fs.promises.mkdir(path.dirname(config.fuelDataPath), { recursive: true }));

    afterEach(() => fs.promises.unlink(config.fuelDataPath));

    it('should create a new file when not exists', done => {
      // ARRANGE
      const fuelConsumption = createFuelConsumption();
      const req = { body: fuelConsumption };
      const res = createResponse();
      const logger = createLogger();
      const indexController = new IndexController(config, logger);
      // ACT
      indexController.postFuelConsumption(req, res, function (err) {
        if (err) return done(err);

        fs.promises.readFile(config.fuelDataPath)
          .then(fileData => {
            // ASSERT
            const fuelConsumptionRecords = JSON.parse(fileData);
            assert.strictEqual(fuelConsumptionRecords.length, 1);
            assert.strictEqual(fuelConsumptionRecords[0].liters, fuelConsumption.liters);
            assert.strictEqual(fuelConsumptionRecords[0].kilometers, fuelConsumption.kilometers);
            assert.strictEqual(fuelConsumptionRecords[0].fuelPrice, fuelConsumption.fuelPrice);
          })
          .then(done)
          .catch(done);
      });
    });

    it('should append file when exists', done => {
      // ARRANGE
      const fuelConsumption0 = createFuelConsumption();
      const fuelConsumption1 = createFuelConsumption();
      const req0 = { body: fuelConsumption0 };
      const req1 = { body: fuelConsumption1 };
      const res = createResponse();
      const logger = createLogger();
      const indexController = new IndexController(config, logger);
      // ACT
      indexController.postFuelConsumption(req0, res, function (err) {
        if (err) return done(err);

        indexController.postFuelConsumption(req1, res, function (err) {
          if (err) return done(err);

          fs.promises.readFile(config.fuelDataPath)
            .then(fileData => {
              // ASSERT
              const fuelConsumptionRecords = JSON.parse(fileData);
              assert.strictEqual(fuelConsumptionRecords.length, 2);
              assert.strictEqual(fuelConsumptionRecords[1].liters, fuelConsumption1.liters);
              assert.strictEqual(fuelConsumptionRecords[1].kilometers, fuelConsumption1.kilometers);
              assert.strictEqual(fuelConsumptionRecords[1].fuelPrice, fuelConsumption1.fuelPrice);
            })
            .then(done)
            .catch(done);
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
    send: () => {},
    status: () => { return { end: () => {} }; }
  };
}

function createLogger () {
  return {
    logEvent: () => {},
    logException: () => {},
    logTrace: () => {}
  };
}
