import { ILogger } from "../logic/ILogger";

export class DummyLogger implements ILogger {
  public logEvent (name: string, properties: any) {
    console.log({ name, properties });
  }

  public logException (error: Error) {
    console.error(error);
  }

  public logTrace (message: string) {
    console.log(message);
  }
}
