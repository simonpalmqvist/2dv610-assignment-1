import { Hop } from '../model/Hop'
import { Recipe } from '../model/Recipe'
import Actions from '../view/Action'
import { State } from '../view/State'
import { View } from '../view/View'

export class BrewApp {
  private readonly _view: View
  private readonly _recipe: Recipe

  constructor (view: View, recipe: Recipe) {
    this._view = view
    this._recipe = recipe
  }

  public init () : void {
    let state: State = {
      recipe: {
        volume: this._recipe.volume,
        efficiency: this._recipe.efficiency,
        expectedOG: this._recipe.expectedOG,
        expectedFG: this._recipe.expectedFG,
        expectedIBU: this._recipe.expectedIBU,
        expectedABV: this._recipe.expectedABV,
        hops: [],
        fermentables: []
      }
    }
    this._view.render(state)
    this._view.on(Actions.ADD_HOP, this._addHop.bind(this))
  }

  private _addHop(alpha: number, amount: number, name: string, time: number) : void {
    this._recipe.addHop(new Hop(alpha, amount, name, time))
  }
}
