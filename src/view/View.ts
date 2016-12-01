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

  public render (state: State) : void {
    if (this._printStart) {
      this._printWelcomeMessage()
    }
  }

  private _printWelcomeMessage () : void {
    this._ui.print('Welcome to this beer brewing app!')
    this._printStart = false
  }

  private _handleUserActions (input: string) : void {
    switch (input) {
      case 'add hop':
        this._recipeView.showAddHopsForm()
        break
      default:
        'implement me'
    }
  }
}
