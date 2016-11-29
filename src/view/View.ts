import { ConsoleUI } from './ConsoleUI'
import { State } from './State'
import { EventEmitter } from 'events'

export class View extends EventEmitter {
  private _ui: ConsoleUI
  private _printStart: boolean = true

  constructor (ui: ConsoleUI) {
    super()
    this._ui = ui
  }

  public render (state: State) : void {
    if(this._printStart) {
      this._printWelcomeMessage()
    }
  }

  private _printWelcomeMessage () : void {
    this._ui.print('Welcome to this beer brewing app!')
    this._printStart = false
  }
}
