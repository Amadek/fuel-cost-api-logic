var Interface = require('@amadek/js-sdk/Interface');

var IFuelConsumption = new Interface('IFuelConsumption', [], ['liters', 'kilometers', 'fuelPrice', 'created']);

module.exports = IFuelConsumption;
