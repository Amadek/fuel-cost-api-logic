
export interface ILogger {
  logEvent (name: string, properties: any): void;

  logException (error: Error): void;

  logTrace (message: string): void;
}
