import { getFakeStateWithoutIngredients } from '../test/helper'
import Action from './Action'
import { ConsoleUI } from './ConsoleUI'
import { FermentableForm } from './FermentableForm'
import { HopForm } from './HopForm'
import { RecipeView } from './RecipeView'
import { State } from './State'
import { View } from './View'
import { expect, use } from 'chai'
import { assert, createStubInstance } from 'sinon'
import * as SinonChai from 'sinon-chai'

describe('Class View', () => {
  use(SinonChai)
  let stateMock: State.State
  let consoleUIMock: ConsoleUIMock
  let recipeViewMock: RecipeViewMock
  let sut: View
  const hopTrigger = 'add hop'
  const fermentableTrigger = 'add fermentable'
  const blankLines: string = '\n\n'
  const startMessage: string = 'Welcome to this beer brewing app!'
  const hopForm: HopForm = {
    alpha: 14,
    amount: 30,
    name: 'Amarillo',
    time: 60,
  }
  const fermentableForm: FermentableForm = {
    amount: 3.5,
    name: 'Pilsner malt',
    yieldPercent: 0.75,
  }

  beforeEach(() => {
    stateMock = getFakeStateWithoutIngredients()
    recipeViewMock = <RecipeViewMock> createStubInstance(RecipeView)
    consoleUIMock = <ConsoleUIMock> createStubInstance(ConsoleUI)
    sut = new View(<any> consoleUIMock, <any> recipeViewMock)
  })

  describe('Method', () => {
    describe('render', () => {
      it('Should start new render with two blank rows', () => {
        sut.render(stateMock)

        expect(consoleUIMock.print.withArgs(blankLines)).to.be.called
      })

      it('Should present startup message on first render', () => {
        sut.render(stateMock)

        expect(consoleUIMock.print.withArgs(startMessage)).to.be.called
      })

      it('Should not present startup message second time', () => {
        sut.render(stateMock)
        sut.render(stateMock)

        expect(consoleUIMock.print.withArgs(startMessage)).to.be.calledOnce
      })

      it('Should show recipe information', () => {
        sut.render(stateMock)

        expect(recipeViewMock.showRecipeInformation).to.be.calledWith(stateMock.recipe)
      })

      it('Should show hop information', () => {
        sut.render(stateMock)

        expect(recipeViewMock.showHopInformation).to.be.calledWith(stateMock.recipe.hops)
      })

      it('Should show prompt last', () => {
        sut.render(stateMock)

        assert.callOrder(
          consoleUIMock.print.withArgs(blankLines),
          consoleUIMock.print.withArgs(startMessage),
          recipeViewMock.showRecipeInformation,
          recipeViewMock.showHopInformation,
          consoleUIMock.prompt,
        )
      })
    })

    describe('handleUserAction', () => {
      it('Should have registered handler to console UI', () => {
        expect(consoleUIMock.registerInputHandler).to.be.called
      })

      it('Should show prompt after action', () => {
        consoleUIMock.registerInputHandler.callArgWith(0, 'some action')

        expect(consoleUIMock.prompt).to.be.called
      })

      it('Should show message if action doesnt exist', () => {
        let expected: string = 'Please use one of the following commands: [add hop]'
        consoleUIMock.registerInputHandler.callArgWith(0, 'no action')

        expect(consoleUIMock.print).to.be.calledWith(expected)
      })

      it('Should show add hops form when input is "add hop"', () => {
        recipeViewMock.showAddHopsForm.returns(Promise.resolve(hopForm))
        consoleUIMock.registerInputHandler.callArgWith(0, hopTrigger)

        expect(recipeViewMock.showAddHopsForm).to.be.called
      })

      it('Should emit action add hops when input is received from form', (done) => {
        const expected: any[] = [
          hopForm.alpha,
          hopForm.amount,
          hopForm.name,
          hopForm.time,
        ]

        recipeViewMock.showAddHopsForm.returns(Promise.resolve(hopForm))

        sut.on(Action.ADD_HOP, (...actual) => {
          expect(actual).to.deep.equal(expected)
          done()
        })

        consoleUIMock.registerInputHandler.callArgWith(0, hopTrigger)
      })

      it('Should show add fermentable form when input is "add fermentable"', () => {
        recipeViewMock.showAddFermentableForm
          .returns(Promise.resolve(fermentableForm))

        consoleUIMock.registerInputHandler.callArgWith(0, fermentableTrigger)

        expect(recipeViewMock.showAddFermentableForm).to.be.called
      })

      it('Should emit action add fermentable when input is received from form', (done) => {
        const expected: any[] = [
          fermentableForm.amount,
          fermentableForm.name,
          fermentableForm.yieldPercent,
        ]

        recipeViewMock.showAddFermentableForm
          .returns(Promise.resolve(fermentableForm))

        sut.on(Action.ADD_FERMENTABLE, (...actual) => {
          expect(actual).to.deep.equal(expected)
          done()
        })

        consoleUIMock.registerInputHandler.callArgWith(0, fermentableTrigger)
      })

    })
  })

})
