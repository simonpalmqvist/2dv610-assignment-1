import {
  getFakeStateWithFermentables,
  getFakeStateWithHops,
  getFakeStateWithoutIngredients,
} from '../test/helper'
import { ConsoleUI } from './ConsoleUI'
import { FermentableForm } from './FermentableForm'
import { HopForm } from './HopForm'
import { RecipeView } from './RecipeView'
import { State } from './State'
import { expect, use } from 'chai'
import { createStubInstance } from 'sinon'
import * as SinonChai from 'sinon-chai'

describe('Class RecipeView', () => {
  use(SinonChai)
  let stateMock: State.State
  let stateHopMock: ReadonlyArray<State.Hop>
  let stateFermentableMock: ReadonlyArray<State.Fermentable>
  let consoleUIMock: ConsoleUIMock
  let sut: RecipeView
  let questionValidator: (question: string, answer: string) => boolean
  const hopNameLabel: string = 'Name of hop: '
  const alphaLabel: string = 'Alpha (%) [0-100]: '
  const hopAmountLabel: string = 'Amount (g): '
  const timeLabel: string = 'Time (min): '
  const fermentableNameLabel: string = 'Name of fermentable: '
  const fermentableAmountLabel: string = 'Amount (kg): '
  const yieldLabel: string = 'Yield (%) [0-100]: '
  const separation: string = '------------------------------------------------------------'

  beforeEach(() => {
    stateMock = getFakeStateWithoutIngredients()
    stateHopMock = getFakeStateWithHops().recipe.hops
    stateFermentableMock = getFakeStateWithFermentables().recipe.fermentables

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
          separation,
          'Volume:        20 l',
          'Efficiency:    80.0 %',
          '',
          'OG:            1.050',
          'FG:            1.010',
          'IBU:           36',
          'ABV:           4.8 %',
          '',
        ].join('\n')

        sut.showRecipeInformation(stateMock.recipe)

        expect(consoleUIMock.print).to.be.calledWith(expected)
      })
    })

    describe('showHopInformation', () => {
      it('Should print header', () => {
        const expected: string = [
          'Hops',
          separation,
          'Name                     Alpha    Amount      Time       IBU',
          separation,
        ].join('\n')

        sut.showHopInformation(stateHopMock)

        expect(consoleUIMock.print.firstCall).to.be.calledWith(expected)
      })

      it('Should print rows in correct format', () => {
        const row1: string =
          'Cascade                  6.0 %      50 g    15 min        10'
        const row2: string =
          'Citra                   12.0 %     100 g     0 min         0'

        sut.showHopInformation(stateHopMock)

        expect(consoleUIMock.print.secondCall).to.be.calledWith(row1)
        expect(consoleUIMock.print.thirdCall).to.be.calledWith(row2)
      })

      it('Should print footer last', () => {
        sut.showHopInformation(stateHopMock)

        expect(consoleUIMock.print.lastCall).to.be.calledWith(separation)
      })
    })

    describe('showFermentableInformation', () => {
      it('Should print header', () => {
        const expected: string = [
          'Fermentables',
          separation,
          'Name                               Yield    Amount        OG',
          separation,
        ].join('\n')

        sut.showFermentableInformation(stateFermentableMock)

        expect(consoleUIMock.print.firstCall).to.be.calledWith(expected)
      })

      it('Should print rows in correct format', () => {
        const row1: string =
          'Pale Ale-malt                     74.0 %  2.400 kg     1.020'
        const row2: string =
          'Carapils                          65.0 %  0.500 kg     1.003'

        sut.showFermentableInformation(stateFermentableMock)

        expect(consoleUIMock.print.secondCall).to.be.calledWith(row1)
        expect(consoleUIMock.print.thirdCall).to.be.calledWith(row2)
      })

      it('Should print footer last', () => {
        sut.showFermentableInformation(stateFermentableMock)

        expect(consoleUIMock.print.lastCall).to.be.calledWith(separation)
      })
    })

    describe('showAddHopsForm', () => {
      beforeEach(() => {
        consoleUIMock.askQuestion.returns(Promise.resolve())
      })

      describe('name', () => {
        it('Should ask question', async () => {
          await sut.showAddHopsForm()
          expect(consoleUIMock.askQuestion).to.be.calledWith(hopNameLabel)
        })

        it('Should return input received from question', async () => {
          let expected: string = 'Cascade'
          consoleUIMock.askQuestion.returns(Promise.resolve(expected))

          let {name}: HopForm = await sut.showAddHopsForm()
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

          let {alpha}: HopForm = await sut.showAddHopsForm()

          expect(alpha).to.equal(+expected / 100)
        })
      })

      describe('amount', () => {
        it('Should ask question', async () => {
          await sut.showAddHopsForm()
          expect(consoleUIMock.askQuestion.withArgs(hopAmountLabel)).to.be.called
        })

        it('Should validate and return true if number is 0 or higher', async () => {
          await sut.showAddHopsForm()
          expect(questionValidator(hopAmountLabel, '1')).to.be.true
        })

        it('Should validate and return false if number is negative', async () => {
          await sut.showAddHopsForm()
          expect(questionValidator(hopAmountLabel, '-1')).to.be.false
        })

        it('Should validate and return false if not a number', async () => {
          await sut.showAddHopsForm()
          expect(questionValidator(hopAmountLabel, 'fkweofw')).to.be.false
        })

        it('Should return value received from question', async () => {
          let expected: string = '30'
          consoleUIMock.askQuestion.returns(Promise.resolve(expected))

          let {amount}: HopForm = await sut.showAddHopsForm()
          expect(amount).to.equal(+expected)
        })
      })

      describe('time', () => {
        it('Should ask question', async () => {
          await sut.showAddHopsForm()

          expect(consoleUIMock.askQuestion.withArgs(timeLabel)).to.be.called
        })

        it('Should validate and return true if number is 0 or higher', async () => {
          await sut.showAddHopsForm()
          expect(questionValidator(timeLabel, '1')).to.be.true
        })

        it('Should validate and return false if number is negative', async () => {
          await sut.showAddHopsForm()
          expect(questionValidator(timeLabel, '-1')).to.be.false
        })

        it('Should validate and return false if not a number', async () => {
          await sut.showAddHopsForm()
          expect(questionValidator(timeLabel, 'fkweofw')).to.be.false
        })

        it('Should return value received from question', async () => {
          let expected: string = '60'
          consoleUIMock.askQuestion.returns(Promise.resolve(expected))

          let {time}: HopForm = await sut.showAddHopsForm()
          expect(time).to.equal(+expected)
        })
      })
    })

    describe('ShowAddFermentableForm', () => {
      beforeEach(() => {
        consoleUIMock.askQuestion.returns(Promise.resolve())
      })

      describe('name', () => {
        it('Should ask question', async () => {
          await sut.showAddFermentableForm()

          expect(consoleUIMock.askQuestion).to.be.calledWith(fermentableNameLabel)
        })

        it('Should return value received from question', async () => {
          let expected: string = 'Pale ale-malt'
          consoleUIMock.askQuestion.returns(Promise.resolve(expected))

          let {name}: FermentableForm = await sut.showAddFermentableForm()

          expect(name).to.equal(expected)
        })
      })

      describe('amount', () => {
        it('Should ask question', async () => {
          await sut.showAddFermentableForm()
          expect(consoleUIMock.askQuestion.withArgs(fermentableAmountLabel)).to.be.called
        })

        it('Should validate and return true if number is 0 or higher', async () => {
          await sut.showAddFermentableForm()
          expect(questionValidator(fermentableAmountLabel, '1.5')).to.be.true
        })

        it('Should validate and return false if number is negative', async () => {
          await sut.showAddFermentableForm()
          expect(questionValidator(fermentableAmountLabel, '-1')).to.be.false
        })

        it('Should validate and return false if not a number', async () => {
          await sut.showAddFermentableForm()
          expect(questionValidator(fermentableAmountLabel, 'fkweofw')).to.be.false
        })

        it('Should return value received from question', async () => {
          let expected: string = '4.6'
          consoleUIMock.askQuestion.returns(Promise.resolve(expected))

          let {amount}: FermentableForm = await sut.showAddFermentableForm()

          expect(amount).to.equal(+expected)
        })
      })

      describe('yield', () => {
        it('Should ask question', async () => {
          await sut.showAddFermentableForm()
          expect(consoleUIMock.askQuestion.withArgs(yieldLabel)).to.be.called
        })

        it('Should validate and return false if not a number', async () => {
          await sut.showAddFermentableForm()
          expect(questionValidator(yieldLabel, 'NANANA')).to.be.false
        })

        it('Should validate and return false if number is negative', async () => {
          await sut.showAddFermentableForm()
          expect(questionValidator(yieldLabel, '-1')).to.be.false
        })

        it('Should validate and return false if number is over 100', async () => {
          await sut.showAddFermentableForm()
          expect(questionValidator(yieldLabel, '101')).to.be.false
        })

        it('Should validate and return true within 0-100', async () => {
          await sut.showAddFermentableForm()
          expect(questionValidator(yieldLabel, '0')).to.be.true
        })

        it('Should return value received from question', async () => {
          let expected: string = '75'
          consoleUIMock.askQuestion.returns(Promise.resolve(expected))

          let {yieldPercent}: FermentableForm = await sut.showAddFermentableForm()

          expect(yieldPercent).to.equal(+expected / 100)
        })
      })
    })
  })
})
