/* global describe, it */
const assert = require('assert');
const FuelConsumptionController = require('../api/FuelConsumptionController');

console.log(process.env.NODE_ENV);

describe('TestFuelConsumptionController', () => {
  describe('postFuelConsumption', () => {
    it('should post FuelConsumption to db', done => {
      // ARRANGE
      const fuelConsumption = createFuelConsumption();
      const req = { 
        body: fuelConsumption,
        headers: {
          authorization: 'token'
        }
      };
      const res = createResponse();
      const db = createDb();
      const tokenValidator = createTokenValidator();
      const logger = createLogger();
      const controller = new FuelConsumptionController(db, {}, tokenValidator, logger);
      // ACT
      controller.postFuelConsumption(req, res, err => {
        if (err) return done(err);
        done();
      });
    });
  });
});

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

function createTokenValidator () {
  return {
    validate: () => true
  }
}

function createLogger () {
  return {
    logEvent: () => {},
    logException: () => {},
    logTrace: () => {}
  };
}
