import { BrewApp } from './controller/BrewApp'
import { Recipe } from './model/Recipe'
import { ConsoleUI } from './view/ConsoleUI'
import { View } from './view/View'
import * as readline from 'readline'

const rlOptions: readline.ReadLineOptions = {
  input: process.stdin,
  output: process.stdout,
}

const rl: readline.ReadLine = readline.createInterface(rlOptions)
const consoleUI: ConsoleUI = new ConsoleUI(console, rl)
const view: View = new View(consoleUI)
const recipe: Recipe = new Recipe()
const app: BrewApp = new BrewApp(view, recipe)


rl.setPrompt('BREWIT> ')
app.init()
