import InvalidValueError from "../error/InvalidValueError";

export default class Hop {
  private _alpha: number

  public get alpha () : number {
    return this._alpha
  }

  public set alpha (alpha: number) {
    if (alpha < 0) {
      throw new InvalidValueError(`Property alpha can not be set to ${alpha}`)
    }

    this._alpha = alpha
  }

  constructor (alpha: number) {
    this.alpha = alpha
  }

}
