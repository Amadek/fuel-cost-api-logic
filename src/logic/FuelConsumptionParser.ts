import { IFuelConsumption } from "./IFuelConsumption";

export class FuelConsumptionParser {
  private _errorMessage: string;
  private readonly _fuelConsumptionFromJSON: any;
  private _fuelConsumption: IFuelConsumption;
  
  public get errorMessage (): string { return 'Parse error: ' + this._errorMessage; }

  public get result (): IFuelConsumption { return this._fuelConsumption; }

  public constructor (fuelConsumptionFromJSON: any) {
    this._fuelConsumptionFromJSON = fuelConsumptionFromJSON;
  }

  public parse (): boolean { 
    const liters: number = parseFloat(this._fuelConsumptionFromJSON.liters);
    if (!liters) {
      this._errorMessage = 'invalid liters';
      return false;
    }

    const kilometers: number = parseFloat(this._fuelConsumptionFromJSON.kilometers);
    if (!kilometers) {
      this._errorMessage = 'invalid kilometers';
      return false;
    }

    const fuelPrice: number = parseFloat(this._fuelConsumptionFromJSON.fuelPrice);
    if (!fuelPrice) {
      this._errorMessage = 'invalid fuelPrice';
      return false;
    }

    this._fuelConsumption = {
      liters: liters,
      kilometers: kilometers,
      fuelPrice: fuelPrice,
      created: new Date()
    };

    return true;
  }
}
