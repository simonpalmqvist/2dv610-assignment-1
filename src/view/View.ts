import { ConsoleUI } from './ConsoleUI'
import { State } from './State'
import { EventEmitter } from 'events'

export class View extends EventEmitter {
  private _ui: ConsoleUI

  constructor (ui: ConsoleUI) {
    super()
    this._ui = ui
  }

  public render (state: State) : void {
    this._ui.print('Welcome to this beer brewing app!')
  }
}
