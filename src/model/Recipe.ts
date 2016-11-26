import Validate from '../validation/Validate'
import Fermentable from './Fermentable'
import Hop from './Hop'
import Yeast from './Yeast'

export default class Recipe {
  private _volume: number = 20
  private _efficiency: number = 0.75
  private _yeast: Yeast
  private _hops: Hop[] = []
  private _fermentables: Fermentable[] = []

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
    Validate.percent(efficiency)
    this._efficiency = efficiency
  }

  get yeast () : Yeast {
    return this._yeast
  }

  set yeast (newYeast: Yeast) {
    this._yeast = newYeast
  }

  get hops () : Hop[] {
    return this._hops.slice()
  }

  get fermentables () : Fermentable[] {
    return this._fermentables.slice()
  }

  get expectedOG () : number {
    return this._fermentables
      .map((f) => f.calcExpectedOG(this.efficiency, this.volume) - 1)
      .reduce((total, og) => total + og, 1)
  }

  get expectedFG () : number {
    const attenuation: number = !this.yeast ? 0 : this.yeast.attenuation

    const change: number = (this.expectedOG - 1) * attenuation
    return this.expectedOG - change
  }

  public addHop (hop: Hop) : void {
    this._hops.push(hop)
  }

  public addFermentable (fermentable: Fermentable) : void {
    this._fermentables.push(fermentable)
  }
}
