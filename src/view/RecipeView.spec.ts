import { getFakeStateWithHops, getFakeStateWithoutIngredients } from '../test/helper'
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
        const expected: string = [
          '',
          'Recipe',
          '--------------------------------------------------',
          'Volume:        20 l',
          'Efficiency:    80.0 %',
          '',
          'OG:            1.050',
          'FG:            1.010',
          'IBU:           36',
          'ABV:           4.8 %',
          '--------------------------------------------------',
        ].join('\n')

        let stateMock = getFakeStateWithoutIngredients()
        let consoleUIMock: ConsoleUIMock = <ConsoleUIMock> createStubInstance(ConsoleUI)
        let sut: RecipeView = new RecipeView(<any> consoleUIMock)

        sut.showRecipeInformation(stateMock.recipe)

        expect(consoleUIMock.print).to.be.calledWith(expected)
      })
    })

    describe('showAddHopsForm', () => {
      it('Should ask for name', () => {
        let consoleUIMock: ConsoleUIMock = <ConsoleUIMock> createStubInstance(ConsoleUI)
        let sut: RecipeView = new RecipeView(<any> consoleUIMock)

        consoleUIMock.askQuestion.returns(Promise.resolve())

        sut.showAddHopsForm()

        expect(consoleUIMock.askQuestion).to.be.calledWith('Name of hop: ')
      })
    })
  })
})
