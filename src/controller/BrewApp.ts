import { Hop } from '../model/Hop'
import Actions from '../view/Action'
import View from '../view/View'

export default class BrewApp {
  private readonly _view: View

  constructor (view: View) {
    this._view = view
  }

  public init () : void {
    this._view.render()
    this._view.on(Actions.ADD_HOP, this._addHop.bind(this))
  }

  private _addHop(alpha: number, amount: number, name: string, time: number) : void {
    new Hop(alpha, amount, name, time)
  }
}
