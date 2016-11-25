import Validate  from '../validation/Validate'

export default class Fermentable {
  private _yield: number
  private _amount: number
  private _name: string = 'My malt'

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
    return this._name
  }

  set name (name: string) {
    this._name = name
  }

  constructor (yieldPercent: number, amount: number) {
    this.yield = yieldPercent
    this.amount = amount
  }
}
