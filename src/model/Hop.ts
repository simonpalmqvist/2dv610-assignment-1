import Validate  from '../validation/Validate'

export class Hop {
  private _alpha: number
  private _amount: number
  private _name: string
  private _time: number

  public get alpha () : number {
    return this._alpha
  }

  public set alpha (alpha: number) {
    Validate.percent(alpha)

    this._alpha = alpha
  }

  public get amount () : number {
    return this._amount
  }

  public set amount (amount: number) {
    Validate.notNegative(amount)
    this._amount = amount
  }

  public get name () : string {
    return this._name
  }

  public set name (name: string) {
    this._name = name
  }

  public get time () : number {
    return this._time
  }

  public set time (time: number) {
    Validate.notNegative(time)
    this._time = time
  }

  constructor (alpha: number, amount: number, name: string, time: number) {
    this.alpha = alpha
    this.amount = amount
    this.name = name
    this.time = time
  }

  public calculateIBU (gravity: number, wortVolume: number) : number {
    const bignessFactor: number = 1.65 * Math.pow(0.000125, gravity - 1)
    const boilTimeFactor: number = (1 - Math.exp(-0.04 * this.time)) / 4.15
    const mgPerLAddedAlpha: number = (this.alpha * this.amount * 1000) / wortVolume

    return bignessFactor * boilTimeFactor * mgPerLAddedAlpha
  }
}
