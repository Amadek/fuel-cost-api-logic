var dotenv = require('dotenv');
var path = require('path');
dotenv.config({ path: path.resolve(__dirname, './.env.' + process.env.ENVIRONMENT) });

var config = {
  api: {
    // We are using JSON.parse to parse string to bool value.
    shouldRun: JSON.parse(process.env.SHOULD_RUN_API),
    port: process.env.API_PORT
  },
  fuelDataPath: process.env.FUEL_DATA_PATH
};

module.exports = config;
