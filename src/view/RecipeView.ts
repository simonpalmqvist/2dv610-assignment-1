import { ConsoleUI } from './ConsoleUI'
import { FermentableForm } from './FermentableForm'
import { HopForm } from './HopForm'
import { State } from './State'

export class RecipeView {
  private _ui: ConsoleUI

  constructor(ui: ConsoleUI) {
    this._ui = ui

    this._validatePercent = this._validatePercent.bind(this)
    this._validateNotNegative = this._validateNotNegative.bind(this)
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
      '',
    ].join('\n')

    this._ui.print(info)
  }

  public showHopInformation (hops: ReadonlyArray<State.Hop>) : void {
    const header: string = [
      'Hops',
      this._separationLine(),
      'Name                     Alpha    Amount      Time       IBU',
      this._separationLine(),
    ].join('\n')
    const footer: string = this._separationLine()

    this._ui.print(header)

    hops.forEach((hop) => this._ui.print(this._hopRow(hop)))

    this._ui.print(footer)
  }

  public async showAddHopsForm () : Promise<HopForm> {
    const name: string = await this._ui.askQuestion('Name of hop: ')
    const alpha: string = await this._ui.askQuestion('Alpha (%) [0-100]: ', this._validatePercent)
    const amount: string = await this._ui.askQuestion('Amount (g): ', this._validateNotNegative)
    const time: string = await this._ui.askQuestion('Time (min): ', this._validateNotNegative)

    return {
      alpha: +alpha / 100,
      amount: +amount,
      name,
      time: +time,
    }
  }

  public async showAddFermentableForm () : Promise<FermentableForm> {
    await this._ui.askQuestion('Amount (kg): ', this._validateNotNegative)

    return {
      name: await this._ui.askQuestion('Name of fermentable: '),
      amount: 0,
      yieldPercent: 0
    }
  }

  private _hopRow ({name, alpha, amount, time, ibu}: State.Hop) : string {
    let rightPadding: number = 10
    return [
      this._leftAlign(name, 20),
      this._rightAlign(this._formatPercent(alpha), rightPadding),
      this._rightAlign(this._formatInt(amount) + ' g', rightPadding),
      this._rightAlign(this._formatInt(time) + ' min', rightPadding),
      this._rightAlign(this._formatInt(ibu), rightPadding),
    ].join('')
  }

  private _twoColumn (firstColumn: string, secondColumn: string) : string {
    return this._leftAlign(firstColumn + ':', 15) + secondColumn
  }

  private _leftAlign(text: string, length: number) : string {
    return text + this._repeatChar(' ', length - text.length)
  }

  private _rightAlign(text: string, length: number) : string {
    return this._repeatChar(' ', length - text.length) + text
  }

  private _separationLine () : string {
    return this._repeatChar('-', 60)
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

  private _validatePercent (answer: string) : boolean {
    return this._validateNotNegative(answer) && +answer <= 100
  }

  private _validateNotNegative (answer: string) : boolean {
    return +answer >= 0
  }
}
