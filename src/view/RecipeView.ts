import { ConsoleUI } from './ConsoleUI'
import { FermentableForm } from './FermentableForm'
import { HopForm } from './HopForm'
import { State } from './State'

export class RecipeView {
  private _ui: ConsoleUI
  private _padding: number = 10

  constructor(ui: ConsoleUI) {
    this._ui = ui

    this._validatePercent = this._validatePercent.bind(this)
    this._validateNotNegative = this._validateNotNegative.bind(this)
  }

  public showRecipeInformation (recipe: State.Recipe) : void {
    let info: string = [
      '',
      'RECIPE',
      this._separationLine(),
      this._twoColumn('Volume', this._formatInt(recipe.volume) + ' l'),
      this._twoColumn('Efficiency', this._formatPercent(recipe.efficiency)),
      '',
      this._twoColumn('OG', this._formatGravity(recipe.expectedOG)),
      this._twoColumn('FG', this._formatGravity(recipe.expectedFG)),
      this._twoColumn('IBU', this._formatInt(recipe.expectedIBU)),
      this._twoColumn('ABV', this._formatPercent(recipe.expectedABV)),
    ].join('\n')

    this._ui.print(info)
  }

  public showHopInformation (hops: ReadonlyArray<State.Hop>) : void {
    this._ui.print(this._header('Hops', this._hopHeaderRow()))

    hops.forEach((hop) => this._ui.print(this._hopRow(hop)))

    this._ui.print(this._separationLine())
  }

  public showFermentableInformation (fermentables: ReadonlyArray<State.Fermentable>) : void {
    this._ui.print(this._header('Fermentables', this._fermentableHeaderRow()))

    fermentables.forEach((f) => this._ui.print(this._fermentableRow(f)))

    this._ui.print(this._separationLine())
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
    const name: string =
      await this._ui.askQuestion('Name of fermentable: ')
    const amount: string =
      await this._ui.askQuestion('Amount (kg): ', this._validateNotNegative)
    const yieldPercent: string =
      await this._ui.askQuestion('Yield (%) [0-100]: ', this._validatePercent)

    return {
      amount: +amount,
      name,
      yieldPercent: +yieldPercent / 100,
    }
  }

  private _hopHeaderRow () : string {
    return [
      this._leftAlign('Name', this._padding * 2),
      this._rightAlign('Alpha', this._padding),
      this._rightAlign('Amount', this._padding),
      this._rightAlign('Time', this._padding),
      this._rightAlign('IBU', this._padding),
    ].join('')
  }

  private _hopRow ({name, alpha, amount, time, ibu}: State.Hop) : string {
    return [
      this._leftAlign(name, this._padding * 2),
      this._rightAlign(this._formatPercent(alpha), this._padding),
      this._rightAlign(this._formatInt(amount) + ' g', this._padding),
      this._rightAlign(this._formatInt(time) + ' min', this._padding),
      this._rightAlign(this._formatInt(ibu), this._padding),
    ].join('')
  }

  private _fermentableHeaderRow () : string {
    return [
      this._leftAlign('Name', this._padding * 3),
      this._rightAlign('Yield', this._padding),
      this._rightAlign('Amount', this._padding),
      this._rightAlign('OG', this._padding),
    ].join('')
  }

  private _fermentableRow (f: State.Fermentable) : string {
    return [
      this._leftAlign(f.name, this._padding * 3),
      this._rightAlign(this._formatPercent(f.yield), this._padding),
      this._rightAlign(this._formatGravity(f.amount) + ' kg', this._padding),
      this._rightAlign(this._formatGravity(f.og), this._padding),
    ].join('')
  }

  private _header(title: string, headerRow: string) : string {
    return [
      '',
      title.toUpperCase(),
      this._separationLine(),
      headerRow,
      this._separationLine(),
    ].join('\n')
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
