
export default class Yeast {
  private _name: string
  private _attenuation: number = 0.75

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
    this._attenuation = attenuation
  }

  constructor (name: string) {
    this.name = name
  }
}
