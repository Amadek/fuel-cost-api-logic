var stringValidator = {

  fuelPricePattern: /^[1-9]{1}(\.|,)[0-9]{2}/,
  kilometersPattern: /^\d+$/,
  litersPattern: /^[1-9]{1}[0-9]*(\.|,)?[0-9]*$/,

  validFuelPrice: function (teststring) { return this.fuelPricePattern.test(teststring); },
  validKilometers: function (teststring) { return this.kilometersPattern.test(teststring); },
  validLiters: function (teststring) { return this.litersPattern.test(teststring); }
};

module.exports = stringValidator;
