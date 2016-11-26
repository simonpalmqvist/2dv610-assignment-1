import Validate from '../validation/Validate'

export default class Recipe {
  private _volume: number = 20

  get volume () : number {
    return this._volume
  }

  set volume (volume: number) {
    Validate.notNegative(volume)
    this._volume = volume
  }

  get efficiency () : number {
    return 0.75
  }
}
