import { ConsoleUI } from './ConsoleUI'
import { HopForm } from './HopForm'
import { State } from './State'

export class RecipeView {
  private _ui: ConsoleUI

  constructor(ui: ConsoleUI) {
    this._ui = ui
  }

  public showRecipeInformation (recipe: State.Recipe) : void {
    this._ui.print(`
Recipe
----------------------------------------------
Volume:        ${recipe.volume} l
Efficiency:    ${(recipe.efficiency * 100).toFixed(0)} %

OG:            ${recipe.expectedOG.toFixed(3)}
FG:            ${recipe.expectedFG.toFixed(3)}
IBU:           ${recipe.expectedIBU.toFixed(0)}
ABV:           ${(recipe.expectedABV * 100).toFixed(1)} %
----------------------------------------------`)
  }

  public showHopInformation (hops: ReadonlyArray<State.Hop>) : void {

  }

  public showAddHopsForm () : Promise<HopForm> {
    return Promise.resolve({} as HopForm)
  }
}
