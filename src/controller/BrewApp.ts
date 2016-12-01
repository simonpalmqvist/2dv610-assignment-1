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
    this._view.on(Actions.ADD_HOP, this._addHop.bind(this))
  }

  public init () : void {
    this._view.render(this._getUpdatedState())
  }

  private _addHop (alpha: number, amount: number, name: string, time: number) : void {
    this._recipe.addHop(new Hop(alpha, amount, name, time))
    this._view.render(this._getUpdatedState())
  }

  private _getUpdatedState () : State {
    return {
      recipe: {
        efficiency: this._recipe.efficiency,
        expectedABV: this._recipe.expectedABV,
        expectedFG: this._recipe.expectedFG,
        expectedIBU: this._recipe.expectedIBU,
        expectedOG: this._recipe.expectedOG,
        fermentables: [],
        hops: [],
        volume: this._recipe.volume,
      },
    }
  }
}
