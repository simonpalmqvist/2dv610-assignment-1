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
  let validator: (answer: string) => boolean
  const nameLabel: string = 'Name of hop: '
  const alphaLabel: string = 'Alpha (%) [0-100]: '

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
          expect(consoleUIMock.askQuestion.withArgs()).to.be.called
          done()
        })
      })

      it('Should validate alpha and return false if not a number', (done) => {
        let notNumber: string = 'fkerorekog'
        consoleUIMock.askQuestion.returns(Promise.resolve())

        sut.showAddHopsForm().then(() => {
          validator = consoleUIMock.askQuestion
            .withArgs(alphaLabel).firstCall.args[1]

          expect(validator(notNumber)).to.be.false
          done()
        })
      })

      it('Should validate alpha and return false if number is negative', (done) => {
        let negativeNumber: string = '-1'
        consoleUIMock.askQuestion.returns(Promise.resolve())

        sut.showAddHopsForm().then(() => {
          validator = consoleUIMock.askQuestion
            .withArgs(alphaLabel).firstCall.args[1]

          expect(validator(negativeNumber)).to.be.false
          done()
        })
      })

      it('Should validate alpha and return false if number is over 100', (done) => {
        let negativeNumber: string = '101'
        consoleUIMock.askQuestion.returns(Promise.resolve())

        sut.showAddHopsForm().then(() => {
          validator = consoleUIMock.askQuestion
            .withArgs(alphaLabel).firstCall.args[1]

          expect(validator(negativeNumber)).to.be.false
          done()
        })
      })
    })
  })
})
