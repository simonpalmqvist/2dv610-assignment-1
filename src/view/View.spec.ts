import Action from './Action'
import { ConsoleUI } from './ConsoleUI'
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

      it('Should show add hops form when input is "add hop"', () => {
        consoleUIMock.registerInputHandler.callArgWith(0, 'add hop')

        expect(recipeViewMock.showAddHopsForm).to.be.called
      })

      it('Should emit action add hops when input is received from form', (done) => {
        recipeViewMock.showAddHopsForm.returns(Promise.resolve({
          alpha: 14,
          amount: 30,
          name: 'Amarillo',
          time: 60
        }))

        sut.on(Action.ADD_HOP, (actual) => {
          expect(actual).to.deep.equal({
            alpha: 14,
            amount: 30,
            name: 'Amarillo',
            time: 60
          })
          done()
        })

        consoleUIMock.registerInputHandler.callArgWith(0, 'add hop')
      })
    })
  })

})
