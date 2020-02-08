const Ensure = require('@amadek/js-sdk/Ensure');

class AppInsightsLogger {
  constructor (appInsightsClient) {
    Ensure.notNull(appInsightsClient);
    this.appInsightsClient = appInsightsClient;
  }

  logEvent (name, properties) {
    this.appInsightsClient.trackEvent({ name: name, properties: properties });
  }

  logException (error) {
    this.appInsightsClient.trackException({ exception: error });
  }

  logTrace (message) {
    this.appInsightsClient.trackTrace({ message: message });
  }
}

module.exports = AppInsightsLogger;
