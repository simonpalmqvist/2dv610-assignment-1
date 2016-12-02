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
        it('Should ask question', async () => {
          await sut.showAddHopsForm()
          expect(consoleUIMock.askQuestion).to.be.calledWith(nameLabel)
        })

        it('Should return input received from question', async () => {
          let expected: string = 'Cascade'
          consoleUIMock.askQuestion.returns(Promise.resolve(expected))

          let {name} = await sut.showAddHopsForm()
          expect(name).to.equal(expected)
        })
      })

      describe('alpha', () => {
        it('Should ask question', async () => {
          await sut.showAddHopsForm()
          expect(consoleUIMock.askQuestion.withArgs(alphaLabel)).to.be.called
        })

        it('Should validate and return false if not a number', async () => {
          let notNumber: string = 'fkerorekog'

          await sut.showAddHopsForm()
          expect(questionValidator(alphaLabel, notNumber)).to.be.false
        })

        it('Should validate and return false if number is negative', async () => {
          await sut.showAddHopsForm()
          expect(questionValidator(alphaLabel, '-1')).to.be.false
        })

        it('Should validate and return false if number is over 100', async () => {
          await sut.showAddHopsForm()
          expect(questionValidator(alphaLabel, '101')).to.be.false
        })

        it('Should validate and return true within 0-100', async () => {
          await sut.showAddHopsForm()
          expect(questionValidator(alphaLabel, '100')).to.be.true
        })

        it('Should return value received from question', async () => {
          let expected: string = '45'
          consoleUIMock.askQuestion.returns(Promise.resolve(expected))

          let {alpha} = await sut.showAddHopsForm()

          expect(alpha).to.equal(+expected / 100)
        })
      })

      describe('amount', () => {
        it('Should ask question', async () => {
          await sut.showAddHopsForm()
          expect(consoleUIMock.askQuestion.withArgs(amountLabel)).to.be.called
        })

        it('Should validate and return true if number is 0 or higher', async () => {
          await sut.showAddHopsForm()
          expect(questionValidator(amountLabel, '1')).to.be.true
        })

        it('Should validate and return false if number is negative', async () => {
          await sut.showAddHopsForm()
          expect(questionValidator(amountLabel, '-1')).to.be.false
        })

        it('Should validate and return false if not a number', async () => {
          await sut.showAddHopsForm()
          expect(questionValidator(amountLabel, 'fkweofw')).to.be.false
        })

        it('Should return value received from question', async () => {
          let expected: string = '30'
          consoleUIMock.askQuestion.returns(Promise.resolve(expected))

          let {amount} = await sut.showAddHopsForm()
          expect(amount).to.equal(+expected)
        })
      })

      describe('time', () => {
        it('Should ask question', async () => {
          await sut.showAddHopsForm()

          expect(consoleUIMock.askQuestion.withArgs('Time (min): ')).to.be.called
        })
      })

    })
  })
})
