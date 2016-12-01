import { ConsoleUI } from './ConsoleUI'
import { HopForm } from './HopForm'
import { State } from './State'

export class RecipeView {
  private _ui: ConsoleUI

  constructor(ui: ConsoleUI) {
    this._ui = ui
  }

  public showRecipeInformation (recipe: State.Recipe) : void {
    let info: string = [
      '',
      'Recipe',
      this._separationLine(),
      this._twoColumn('Volume', this._formatInt(recipe.volume) + ' l'),
      this._twoColumn('Efficiency', this._formatPercent(recipe.efficiency)),
      '',
      this._twoColumn('OG', this._formatGravity(recipe.expectedOG)),
      this._twoColumn('FG', this._formatGravity(recipe.expectedFG)),
      this._twoColumn('IBU', this._formatInt(recipe.expectedIBU)),
      this._twoColumn('ABV', this._formatPercent(recipe.expectedABV)),
      this._separationLine(),
    ].join('\n')

    this._ui.print(info)
  }

  public showHopInformation (hops: ReadonlyArray<State.Hop>) : void {

  }

  public showAddHopsForm () : Promise<HopForm> {
    let result: HopForm = {
      alpha: 0,
      amount: 0,
      name: '',
      time: 0
    }

    return this._ui.askQuestion('Name of hop: ')
      .then((name) => result.name = name)
      .then(() => this._ui.askQuestion('Alpha (%) [0-100]: ', this._validatePercent))
      .then(() => result)
  }

  private _twoColumn (firstColumn: string, secondColumn: string) : string {
    return this._leftAlign(firstColumn + ':', 15) + secondColumn
  }

  private _leftAlign(text: string, length: number) : string {
    return text + this._repeatChar(' ', length - text.length)
  }

  private _separationLine () : string {
    return this._repeatChar('-', 50)
  }

  private _formatPercent (percent: number) : string {
    return (percent * 100).toFixed(1) + ' %'
  }

  private _formatGravity (gravity: number) : string {
    return gravity.toFixed(3)
  }

  private _formatInt (int: number) : string {
    return int.toFixed(0)
  }

  private _repeatChar (char: string, times: number) : string {
    return new Array(times + 1).join(char)
  }

  private _validatePercent(answer: string) : boolean {
    let number: number = +answer
    return !isNaN(number) && number > 0
  }
}
