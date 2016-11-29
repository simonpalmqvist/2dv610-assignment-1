import * as readline from 'readline'

export class ConsoleUI {
  private _output: Console

  constructor(output: Console, rl: readline.ReadLine) {
    this._output = output
  }

  public registerInputHandler(callback: () => void) {

  }

  public print (message: string) : void {
    this._output.log(message)
  }

}
