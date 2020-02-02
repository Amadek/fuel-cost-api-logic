require('dotenv').config();

var config = {
  api: {
    port: process.env.PORT
  },
  appInsights: process.env.APPINSIGHTS_INSTRUMENTATIONKEY,
  fuelDataPath: process.env.FUEL_DATA_PATH
};

module.exports = config;
