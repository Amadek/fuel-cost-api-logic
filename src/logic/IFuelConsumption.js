const Interface = require('@amadek/js-sdk/Interface');

const IFuelConsumption = new Interface('IFuelConsumption', [], ['liters', 'kilometers', 'fuelPrice', 'created']);

module.exports = IFuelConsumption;
