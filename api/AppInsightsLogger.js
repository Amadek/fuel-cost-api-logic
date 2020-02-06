var Ensure = require('@amadek/js-sdk/Ensure');

var AppInsightsLogger = (function () {
  function AppInsightsLogger (appInsightsClient) {
    Ensure.notNull(appInsightsClient);
    this.appInsightsClient = appInsightsClient;
  }

  AppInsightsLogger.prototype.logEvent = function (name, properties) {
    this.appInsightsClient.trackEvent({ name: name, properties: properties });
  };

  AppInsightsLogger.prototype.logException = function (error) {
    this.appInsightsClient.trackException({ exception: error });
  };

  AppInsightsLogger.prototype.logTrace = function (message) {
    this.appInsightsClient.trackTrace({ message: message });
  };

  return AppInsightsLogger;
}());

module.exports = AppInsightsLogger;
