import {
  getFakeStateWithoutIngredients,
} from '../test/helper'
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
  let questionValidator: (question: string, answer: string) => boolean
  const nameLabel: string = 'Name of hop: '
  const alphaLabel: string = 'Alpha (%) [0-100]: '
  const amountLabel: string = 'Amount (g): '

  beforeEach(() => {
    stateMock = getFakeStateWithoutIngredients()
    consoleUIMock = <ConsoleUIMock> createStubInstance(ConsoleUI)
    sut = new RecipeView(<any> consoleUIMock)
    questionValidator = (q, a) => consoleUIMock.askQuestion.withArgs(q).args[0][1](a)
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
      beforeEach(() => {
        consoleUIMock.askQuestion.returns(Promise.resolve())
      })

      describe('name', () => {
        it('Should ask question', () => {
          sut.showAddHopsForm().then(() => {
            expect(consoleUIMock.askQuestion).to.be.calledWith(nameLabel)
          })
        })

        it('Should return input received from question', (done) => {
          let expected: string = 'Cascade'
          consoleUIMock.askQuestion.returns(Promise.resolve(expected))

          sut.showAddHopsForm().then(({name}) => {
            expect(name).to.equal(expected)
            done()
          })
        })
      })

      describe('alpha', () => {
        it('Should ask question', (done) => {
          sut.showAddHopsForm().then(() => {
            expect(consoleUIMock.askQuestion.withArgs(alphaLabel)).to.be.called
            done()
          })
        })

        it('Should validate and return false if not a number', (done) => {
          let notNumber: string = 'fkerorekog'

          sut.showAddHopsForm().then(() => {
            expect(questionValidator(alphaLabel, notNumber)).to.be.false
            done()
          })
        })

        it('Should validate and return false if number is negative', (done) => {
          sut.showAddHopsForm().then(() => {
            expect(questionValidator(alphaLabel, '-1')).to.be.false
            done()
          })
        })

        it('Should validate and return false if number is over 100', (done) => {
          sut.showAddHopsForm().then(() => {
            expect(questionValidator(alphaLabel, '101')).to.be.false
            done()
          })
        })

        it('Should validate and return true within 0-100', (done) => {
          sut.showAddHopsForm().then(() => {
            expect(questionValidator(alphaLabel, '100')).to.be.true
            done()
          })
        })

        it('Should return value received from question', (done) => {
          let expected: string = '45'
          consoleUIMock.askQuestion.returns(Promise.resolve(expected))

          sut.showAddHopsForm().then(({alpha}) => {
            expect(alpha).to.equal(+expected / 100)
            done()
          })
        })
      })

      describe('amount', () => {
        it('Should ask question', (done) => {
          sut.showAddHopsForm().then(() => {
            expect(consoleUIMock.askQuestion.withArgs(amountLabel)).to.be.called
            done()
          })
        })

        it('Should validate and return true if number is 0 or higher', (done) => {
          sut.showAddHopsForm().then(() => {
            expect(questionValidator(amountLabel, '1')).to.be.true
            done()
          })
        })

        it('Should validate and return false if number is negative', (done) => {
          sut.showAddHopsForm().then(() => {
            expect(questionValidator(amountLabel, '-1')).to.be.false
            done()
          }).catch(done)
        })

      })
    })
  })
})
