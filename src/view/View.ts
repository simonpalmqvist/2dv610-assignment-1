import { State } from './State'
import { EventEmitter } from 'events'

export class View extends EventEmitter {
  public render (state: State) : void {
    console.warn('implement me')
  }
}
