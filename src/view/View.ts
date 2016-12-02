import Action from './Action'
import { ConsoleUI } from './ConsoleUI'
import { RecipeView } from './RecipeView'
import { State } from './State'
import { EventEmitter } from 'events'

export class View extends EventEmitter {
  private _recipeView: RecipeView
  private _ui: ConsoleUI
  private _printStart: boolean = true

  constructor (ui: ConsoleUI, recipeView: RecipeView) {
    super()
    this._ui = ui
    this._recipeView = recipeView
    this._ui.registerInputHandler(this._handleUserActions.bind(this))
  }

  public render (state: State.State) : void {
    this._ui.print('\n\n')

    if (this._printStart) {
      this._printWelcomeMessage()
    }

    this._recipeView.showRecipeInformation(state.recipe)
    this._recipeView.showHopInformation(state.recipe.hops)

    this._ui.prompt()
  }

  private _printWelcomeMessage () : void {
    this._ui.print('Welcome to this beer brewing app!')
    this._printStart = false
  }

  private _handleUserActions (input: string) : void {
    switch (input) {
      case 'add hop':
        this._handleHopAction()
        break
      case 'add fermentable':
        this._recipeView.showAddFermentableForm()
        break
      default:
        this._ui.print('Please use one of the following commands: [add hop]')
    }
    this._ui.prompt()
  }

  private _handleHopAction () : void {
    this._recipeView.showAddHopsForm().then((hop) => this.emit(
        Action.ADD_HOP,
        hop.alpha,
        hop.amount,
        hop.name,
        hop.time,
      )
    )
  }
}
