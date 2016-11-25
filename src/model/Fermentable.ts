import Validate  from '../validation/Validate'

export default class Fermentable {
  private _yield: number
  private _amount: number

  get yield () : number {
    return this._yield
  }

  set yield (newYield: number) {
    Validate.percent(newYield)
    this._yield = newYield
  }

  get amount () : number {
    return this._amount
  }

  set amount (amount: number) {
    Validate.notNegative(amount)
    this._amount = amount
  }

  get name () : string {
    return undefined
  }

  constructor (yieldPercent: number, amount: number) {
    this.yield = yieldPercent
    this.amount = amount
  }
}
