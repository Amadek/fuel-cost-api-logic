import { ILogger } from "../logic/ILogger";

const Ensure = require('@amadek/js-sdk/Ensure');
const appInsights = require('applicationinsights');

export class AppInsightsLogger implements ILogger {
  private _appInsightsClient: any;

  public constructor () {
    appInsights.setup(appInsights);
    appInsights.start();
    this._appInsightsClient = appInsights.defaultClient;
  }

  public logEvent (name: string, properties: any) {
    Ensure.typeOf('', name);
    properties = properties || {};
    this._appInsightsClient.trackEvent({ name: name, properties: properties });
  }

  logException (error: Error) {
    Ensure.notNull(error);
    this._appInsightsClient.trackException({ exception: error });
  }

  logTrace (message: string) {
    Ensure.typeOf('', message);
    this._appInsightsClient.trackTrace({ message: message });
  }
}

module.exports = AppInsightsLogger;
