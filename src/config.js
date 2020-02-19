require('dotenv').config();

const config = {
  development: {
    api: {
      port: 3000
    },
    appInsights: process.env.APPINSIGHTS_INSTRUMENTATIONKEY,
    fuelDataPath: 'output/FuelData.json'
  },
  testing: {
    fuelDataPath: 'output/FuelData.json'
  },
  production: {
    api: {
      port: process.env.PORT
    },
    appInsights: process.env.APPINSIGHTS_INSTRUMENTATIONKEY,
    fuelDataPath: 'output/FuelData.json'
  }
};

module.exports = config;
