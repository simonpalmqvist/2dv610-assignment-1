import Validate  from '../validation/Validate'

export default class Hop {
  private _alpha: number
  private _amount: number

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

  constructor (alpha: number, amount: number) {
    this.alpha = alpha
    this.amount = amount
  }

}
