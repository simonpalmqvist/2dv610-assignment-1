
export default class Recipe {
  private _volume: number = 20

  get volume () : number {
    return this._volume
  }

  set volume (volume: number) {
    this._volume = volume
  }
}
