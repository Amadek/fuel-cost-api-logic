
module.exports = {
  api: {
    port: process.env.PORT,
    github: {
      clientSecret: process.env.GITHUB_CLIENT_SECRET
    }
  },
  appInsights: process.env.APPINSIGHTS_INSTRUMENTATIONKEY,
  mongodb: {
    url: process.env.MONGO_URL,
    dbName: process.env.MONGO_DB_NAME
  }
};
