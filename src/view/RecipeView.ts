import { ConsoleUI } from './ConsoleUI'
import { HopForm } from './HopForm'
import { State } from './State'

export class RecipeView {

  constructor(ui: ConsoleUI) {

  }

  public showRecipeInformation (recipe: State.Recipe) : void {
  }

  public showHopInformation (hops: ReadonlyArray<State.Hop>) : void {

  }

  public showAddHopsForm () : Promise<HopForm> {
    return Promise.resolve({} as HopForm)
  }
}
