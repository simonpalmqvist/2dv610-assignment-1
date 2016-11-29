import { ConsoleUI } from './ConsoleUI'
import { State } from './State'
import { EventEmitter } from 'events'

export class View extends EventEmitter {

  constructor (ui: ConsoleUI) {
    super()
  }
  
  public render (state: State) : void {
    console.warn('implement me')
  }
}
