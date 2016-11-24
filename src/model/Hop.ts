import Validate  from '../validation/Validate'

export default class Hop {
  private _alpha: number
  private _amount: number
  private _name: string

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

  constructor (alpha: number, amount: number, name: string) {
    this.alpha = alpha
    this.amount = amount
    this.name = name
  }

}
