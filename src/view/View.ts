import { EventEmitter } from 'events'

export class View extends EventEmitter {
  public render () : void {
    console.warn('implement me')
  }
}
