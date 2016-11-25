
export default class Fermentable {
  private _yield: number

  get yield () : number {
    return this._yield
  }

  set yield (newYield: number) {
    this._yield = newYield
  }

  constructor (yieldPercent: number) {
    this.yield = yieldPercent
  }
}
