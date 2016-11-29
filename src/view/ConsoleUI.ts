import * as readline from 'readline'

export class ConsoleUI {
  private _output: Console
  private _input: readline.ReadLine

  constructor(output: Console, rl: readline.ReadLine) {
    this._output = output
    this._input = rl
  }

  public registerInputHandler(callback: () => void) : void {
    this._input.on('line', callback)
  }

  public print (message: string) : void {
    this._output.log(message)
  }
}
