import { BrewApp } from './controller/BrewApp'
import { Recipe } from './model/Recipe'
import { Yeast } from './model/Yeast'
import { ConsoleUI } from './view/ConsoleUI'
import { RecipeView } from './view/RecipeView'
import { View } from './view/View'
import * as readline from 'readline'

const rlOptions: readline.ReadLineOptions = {
  input: process.stdin,
  output: process.stdout,
}

const rl: readline.ReadLine = readline.createInterface(rlOptions)
const consoleUI: ConsoleUI = new ConsoleUI(console, rl)
const recipeView: RecipeView = new RecipeView(consoleUI)
const view: View = new View(consoleUI, recipeView)

const recipe: Recipe = new Recipe()

// Setting default yeast since adding yeast in UI is not possible yet
recipe.yeast = new Yeast('Default yeast', 0.75)

const app: BrewApp = new BrewApp(view, recipe)

rl.setPrompt('BREWIT> ')
app.render()
