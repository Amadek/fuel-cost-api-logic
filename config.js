require('dotenv').config();

var config = {
  api: {
    // We are using JSON.parse to parse string to bool value.
    shouldRun: true,
    port: process.env.PORT
  },
  fuelDataPath: 'output/FuelData.json'
};

module.exports = config;
