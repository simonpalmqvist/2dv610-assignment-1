import { Hop } from '../model/Hop'
import Recipe from '../model/Recipe'
import Actions from '../view/Action'
import View from '../view/View'

export default class BrewApp {
  private readonly _view: View
  private readonly _recipe: Recipe

  constructor (view: View, recipe: Recipe) {
    this._view = view
    this._recipe = recipe
  }

  public init () : void {
    this._view.render()
    this._view.on(Actions.ADD_HOP, this._addHop.bind(this))
  }

  private _addHop(alpha: number, amount: number, name: string, time: number) : void {
    new Hop(alpha, amount, name, time)
  }
}
