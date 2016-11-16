import InvalidValueError from "../error/InvalidValueError";

export default class Hop {
  private _alpha: number
  private _amount: number

  public get alpha () : number {
    return this._alpha
  }

  public set alpha (alpha: number) {
    if (alpha < 0 || alpha > 100) {
      throw new InvalidValueError(`Property alpha can not be set to ${alpha}`)
    }

    this._alpha = alpha
  }

  public get amount () : number {
    return this._amount
  }

  public set amount (amount: number) {
    if (amount < 0) {
      throw new InvalidValueError()
    }
    this._amount = amount
  }

  constructor (alpha: number, amount: number) {
    this.alpha = alpha
    this.amount = amount
  }

}
