import { Fermentable } from '../model/Fermentable'
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
    this._view.on(Actions.ADD_FERMENTABLE, this._addFermentable.bind(this))
  }

  public render () : void {
    this._view.render(this._getUpdatedState())
  }

  private _addHop (alpha: number, amount: number, name: string, time: number) : void {
    this._recipe.addHop(new Hop(alpha, amount, name, time))
    this.render()
  }

  private _addFermentable (yieldPercent: number, amount: number, name: string) : void {
    this._recipe.addFermentable(new Fermentable(yieldPercent, amount, name))
  }

  private _getUpdatedState () : State.State {
    return {
      recipe: {
        efficiency: this._recipe.efficiency,
        expectedABV: this._recipe.expectedABV,
        expectedFG: this._recipe.expectedFG,
        expectedIBU: this._recipe.expectedIBU,
        expectedOG: this._recipe.expectedOG,
        fermentables: <ReadonlyArray<State.Fermentable>> [],
        hops: this._getHopState(),
        volume: this._recipe.volume,
        yeast: undefined,
      },
    }
  }

  private _getHopState () : Array<State.Hop> {
    let array: Array<State.Hop> = []

    for (let hop of this._recipe.hops) {
      array.push({
        alpha: hop.alpha,
        amount: hop.amount,
        ibu: hop.calculateIBU(this._recipe.expectedOG, this._recipe.volume),
        name: hop.name,
        time: hop.time,
      })
    }
    return array
  }
}
