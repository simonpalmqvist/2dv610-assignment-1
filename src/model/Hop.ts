
export default class Hop {
  private _alpha: number

  public get alpha () : number {
    return this._alpha
  }

  public set alpha (alpha: number) {
    this._alpha = alpha
  }

  constructor (alpha: number) {
    this._alpha = alpha
  }

}
