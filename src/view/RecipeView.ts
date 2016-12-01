import { HopForm } from './HopForm'

export class RecipeView {
  public showAddHopsForm () : Promise<HopForm> {
    return Promise.resolve({} as HopForm)
  }
}
