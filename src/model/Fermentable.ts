import Validate  from '../validation/Validate'

export default class Fermentable {
  private _yield: number

  get yield () : number {
    return this._yield
  }

  set yield (newYield: number) {
    Validate.percent(newYield)
    this._yield = newYield
  }

  get amount () : number {
    return 3.0
  }

  constructor (yieldPercent: number) {
    this.yield = yieldPercent
  }
}
