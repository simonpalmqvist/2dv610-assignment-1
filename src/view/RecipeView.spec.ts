import { getFakeStateWithoutIngredients } from '../test/helper'
import { ConsoleUI } from './ConsoleUI'
import { RecipeView } from './RecipeView'
import { State } from './State'
import { expect, use } from 'chai'
import { createStubInstance } from 'sinon'
import * as SinonChai from 'sinon-chai'


describe('Class RecipeView', () => {
  use(SinonChai)

  describe('Method', () => {
    describe('showRecipeInformation', () => {
      it('Should print correct layout', () => {
        let stateMock = getFakeStateWithoutIngredients()
        let consoleUIMock: ConsoleUIMock = <ConsoleUIMock> createStubInstance(ConsoleUI)
        let sut: RecipeView = new RecipeView(<any> consoleUIMock)

        sut.showRecipeInformation(stateMock.recipe)

        expect(consoleUIMock.print).to.be.calledWith(`
Recipe
----------------------------------------------
Volume:     20 l
Efficiency: 80 %

OG:         1.050
FG:         1.010
IBU:        32
ABV:        4,8 %
----------------------------------------------
          `)
      })
    })
  })
})
