import { HopForm } from './HopForm'
import { State } from './State'

export class RecipeView {

  public showRecipeInformation (state: State.Recipe) : void {

  }

  public showAddHopsForm () : Promise<HopForm> {
    return Promise.resolve({} as HopForm)
  }
}
