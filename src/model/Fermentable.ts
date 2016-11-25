import Validate  from '../validation/Validate'

export default class Fermentable {
  private _yield: number

  get yield () : number {
    return this._yield
  }

  set yield (newYield: number) {
    Validate.percent(0)
    this._yield = newYield
  }

  constructor (yieldPercent: number) {
    this.yield = yieldPercent
  }
}
