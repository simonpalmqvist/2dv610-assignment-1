import * as readline from 'readline'

export class ConsoleUI {
  private _output: Console
  private _input: readline.ReadLine

  constructor(output: Console, rl: readline.ReadLine) {
    this._output = output
    this._input = rl
  }

  public registerInputHandler(callback: (input: string) => void) : void {
    this._input.on('line', callback)
  }

  public prompt () : void {
    this._input.prompt()
  }

  public print (message: string) : void {
    this._output.log(message)
  }

  public askQuestion (question: string, validation?: (answer: string) => boolean) : Promise<string> {
    return new Promise<string>((resolve) => {
      this._input.question(question, (answer) => {
        let result: any = !validation || validation(answer.trim())
          ? answer.trim()
          : this.askQuestion(question, validation)

        resolve(result)
      })
    })
  }
}
