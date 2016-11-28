import Validate from '../validation/Validate'

export class Yeast {
  private _name: string
  private _attenuation: number

  get name () : string {
    return this._name
  }

  set name (name: string) {
    this._name = name
  }

  get attenuation () : number {
    return this._attenuation
  }

  set attenuation (attenuation: number) {
    Validate.percent(attenuation)
    this._attenuation = attenuation
  }

  constructor (name: string, attenuation: number) {
    this.name = name
    this.attenuation = attenuation
  }
}
