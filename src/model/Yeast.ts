
export default class Yeast {
  private _name: string

  get name () : string {
    return this._name
  }

  set name (name: string) {
    this._name = name
  }

  get attenuation () : number {
    return 0.75
  }

  constructor (name: string) {
    this.name = name
  }
}
