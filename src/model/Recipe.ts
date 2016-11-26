import Validate from '../validation/Validate'

export default class Recipe {
  private _volume: number = 20
  private _efficiency: number = 0.75

  get volume () : number {
    return this._volume
  }

  set volume (volume: number) {
    Validate.notNegative(volume)
    this._volume = volume
  }

  get efficiency () : number {
    return this._efficiency
  }

  set efficiency (efficiency: number) {
    this._efficiency = efficiency
  }
}
