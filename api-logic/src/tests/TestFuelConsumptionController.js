/* global describe, it */
const assert = require('assert');
const IndexController = require('../api/FuelConsumptionController');

console.log(process.env.NODE_ENV);

describe('TestFuelConsumptionController', () => {
  describe('postFuelConsumption', () => {
    it('should post FuelConsumption to db', done => {
      // ARRANGE
      const fuelConsumption = createFuelConsumption();
      const req = { body: fuelConsumption };
      const res = createResponse();
      const dbConnector = createDbConnector();
      const logger = createLogger();
      const indexController = new IndexController(dbConnector, {}, logger);
      // ACT
      indexController.postFuelConsumption(req, res, err => {
        if (err) done(err);
        done();
      });
    });
  });
});

function createDbConnector () {
  return {
    connect: createDb,
    close: () => {}
  };
}

function createDb () {
  return {
    collection: () => ({
      insertOne: () => {}
    })
  };
}

function createFuelConsumption () {
  return {
    liters: Math.floor(Math.random() * 10 + 30),
    kilometers: Math.floor(Math.random() * 50 + 300),
    fuelPrice: Math.floor(Math.random() * 2 + 1)
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
