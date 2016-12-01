import Action from './Action'
import { ConsoleUI } from './ConsoleUI'
import { HopForm } from './HopForm'
import { RecipeView } from './RecipeView'
import { View } from './View'
import { expect, use } from 'chai'
import { assert, createStubInstance } from 'sinon'
import * as SinonChai from 'sinon-chai'

describe('Class View', () => {
  use(SinonChai)
  let stateMock: any
  let consoleUIMock: ConsoleUIMock
  let recipeViewMock: RecipeViewMock
  let sut: View
  const hopForm: HopForm = {
    alpha: 14,
    amount: 30,
    name: 'Amarillo',
    time: 60,
  }

  beforeEach(() => {
    stateMock = {}
    recipeViewMock = <RecipeViewMock> createStubInstance(RecipeView)
    consoleUIMock = <ConsoleUIMock> createStubInstance(ConsoleUI)
    sut = new View(<any> consoleUIMock, <any> recipeViewMock)
  })

  describe('Method', () => {
    describe('render', () => {
      it('Should present startup message on first render', () => {
        let message: string = 'Welcome to this beer brewing app!'

        sut.render(stateMock)

        expect(consoleUIMock.print).to.be.calledWith(message)
      })

      it('Should not present startup message second time', () => {
        sut.render(stateMock)
        sut.render(stateMock)

        expect(consoleUIMock.print).to.be.calledOnce
      })

      it('Should show prompt last', () => {
        sut.render(stateMock)

        assert.callOrder(
          consoleUIMock.print,
          consoleUIMock.prompt
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
        let expected = 'Please use one of the following commands: [add hop]'
        consoleUIMock.registerInputHandler.callArgWith(0, 'no action')

        expect(consoleUIMock.print).to.be.calledWith(expected)
      })

      it('Should show add hops form when input is "add hop"', () => {
        recipeViewMock.showAddHopsForm.returns(Promise.resolve(hopForm))
        consoleUIMock.registerInputHandler.callArgWith(0, 'add hop')

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

        consoleUIMock.registerInputHandler.callArgWith(0, 'add hop')
      })
    })
  })

})
