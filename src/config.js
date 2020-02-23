
module.exports = {
  api: {
    port: process.env.PORT
  },
  appInsights: process.env.APPINSIGHTS_INSTRUMENTATIONKEY,
  mongodb: {
    url: process.env.MONGO_URL,
    dbName: process.env.MONGO_DB_NAME
  }
};
