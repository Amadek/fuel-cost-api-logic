const Ensure = require('@amadek/js-sdk/Ensure');

class AppInsightsLogger {
  constructor (appInsightsClient) {
    Ensure.notNull(appInsightsClient);
    this.appInsightsClient = appInsightsClient;
  }

  logEvent (name, properties) {
    Ensure.typeOf('', name);
    properties = properties || {};
    this.appInsightsClient.trackEvent({ name: name, properties: properties });
  }

  logException (error) {
    Ensure.notNull(error);
    this.appInsightsClient.trackException({ exception: error });
  }

  logTrace (message) {
    Ensure.typeOf('', message);
    this.appInsightsClient.trackTrace({ message: message });
  }
}

module.exports = AppInsightsLogger;
