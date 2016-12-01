import { getFakeStateWithHops, getFakeStateWithoutIngredients } from '../test/helper'
import { ConsoleUI } from './ConsoleUI'
import { RecipeView } from './RecipeView'
import { State } from './State'
import { expect, use } from 'chai'
import { createStubInstance } from 'sinon'
import * as SinonChai from 'sinon-chai'


describe('Class RecipeView', () => {
  use(SinonChai)
  let stateMock: State.State
  let consoleUIMock: ConsoleUIMock
  let sut: RecipeView
  const nameLabel: string = 'Name of hop: '

  beforeEach(() => {
    stateMock = getFakeStateWithoutIngredients()
    consoleUIMock = <ConsoleUIMock> createStubInstance(ConsoleUI)
    sut = new RecipeView(<any> consoleUIMock)
  })

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

        sut.showRecipeInformation(stateMock.recipe)

        expect(consoleUIMock.print).to.be.calledWith(expected)
      })
    })

    describe('showAddHopsForm', () => {
      it('Should ask for name', () => {
        consoleUIMock.askQuestion.returns(Promise.resolve())

        sut.showAddHopsForm().then(() => {
          expect(consoleUIMock.askQuestion).to.be.calledWith(nameLabel)
        })
      })

      it('Should set name received from question', (done) => {
        let expected: string = 'Cascade'
        consoleUIMock.askQuestion
          .withArgs(nameLabel)
          .returns(Promise.resolve(expected))

        sut.showAddHopsForm().then(({name}) => {
          expect(name).to.equal(expected)
          done()
        })
      })

      it('Should ask for alpha acid', (done) => {
        consoleUIMock.askQuestion.returns(Promise.resolve())

        sut.showAddHopsForm().then(() => {
          expect(consoleUIMock.askQuestion.withArgs('Alpha (%) [0-100]: ')).to.be.called
          done()
        })
      })
    })
  })
})
