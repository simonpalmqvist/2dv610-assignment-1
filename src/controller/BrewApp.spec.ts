import * as FermentableModule from '../model/Fermentable'
import * as HopModule from '../model/Hop'
import { Recipe } from '../model/Recipe'
import {
  addStateToRecipeMock,
  getFakeStateWithFermentables,
  getFakeStateWithHops,
  getFakeStateWithoutIngredients,
} from '../test/helper'
import Action from '../view/Action'
import { State } from '../view/State'
import { View } from '../view/View'
import { BrewApp } from './BrewApp'
import { expect, use } from 'chai'
import { createStubInstance, stub } from 'sinon'
import * as SinonChai from 'sinon-chai'

describe('Class BrewApp', () => {
  use(SinonChai)
  let hopStub: Sinon.SinonStub
  let fermentableStub: Sinon.SinonStub
  let viewMock: ViewMock
  let recipeMock: RecipeMock
  let sut: BrewApp

  beforeEach(() => {
    viewMock = <ViewMock> createStubInstance(View)
    recipeMock = <RecipeMock> createStubInstance(Recipe)
    sut = new BrewApp(<any> viewMock, <any> recipeMock)
  })

  describe('Constructor', () => {
    it('Should add listener for ADD_HOP action', () => {
      expect(viewMock.on).calledWith(Action.ADD_HOP)
    })

    it('Should add listener for ADD_FERMENTABLE action', () => {
      expect(viewMock.on).calledWith(Action.ADD_FERMENTABLE)
    })
  })

  describe('Method', () => {
    describe('render', () => {
      it('Should tell view to render', () => {
        sut.render()

        expect(viewMock.render).calledOnce
      })

      it('Should pass on current state to render without added ingredients', () => {
        let state: State.State = getFakeStateWithoutIngredients()
        addStateToRecipeMock(recipeMock, state)

        sut.render()

        expect(viewMock.render.firstCall.args[0]).to.deep.equal(state)
      })

      it('Should pass on current state to render with added hops', () => {
        let state: State.State = getFakeStateWithHops()
        addStateToRecipeMock(recipeMock, state)

        sut.render()

        expect(viewMock.render.firstCall.args).to.deep.equal([state])
      })

      it('Should pass on current state to render with added fermentables', () => {
        let state: State.State = getFakeStateWithFermentables()
        addStateToRecipeMock(recipeMock, state)

        sut.render()

        expect(viewMock.render.firstCall.args).to.deep.equal([state])
      })

    })
  })

  describe('ADD_HOP', () => {
    beforeEach(() => {
      hopStub = stub(HopModule, 'Hop')
    })

    afterEach(() => {
      hopStub.restore()
    })

    it('Should create a hop with values sent in event', () => {
      const args: any[] = [12, 40, 'Amarillo', 15]

      viewMock.on.withArgs(Action.ADD_HOP).callArgWith(1, ...args)

      expect(hopStub).calledWithExactly(...args)
    })

    it('Should call recipe addHop with created hop', () => {
      viewMock.on.withArgs(Action.ADD_HOP).callArg(1)

      const createdHop: Sinon.SinonStub = hopStub.firstCall.returnValue
      expect(recipeMock.addHop).calledWithExactly(createdHop)
    })

    it('Should call render after hop is added', () => {
      viewMock.on.withArgs(Action.ADD_HOP).callArg(1)

      expect(viewMock.render).to.be.calledAfter(recipeMock.addHop)
    })
  })

  describe('ADD_FERMENTABLE', () => {
    beforeEach(() => {
      fermentableStub = stub(FermentableModule, 'Fermentable')
    })

    afterEach(() => fermentableStub.restore())

    it('Should create fermentable with values sent in event', () => {
      const args: any[] = [0.75, 3.5, 'Carapils']

      viewMock.on.withArgs(Action.ADD_FERMENTABLE).callArgWith(1, ...args)

      expect(fermentableStub).calledWithExactly(...args)
    })

    it('Should call recipe addFermentable with created fermentable', () => {
      viewMock.on.withArgs(Action.ADD_FERMENTABLE).callArg(1)

      const expected: Sinon.SinonStub = fermentableStub.firstCall.returnValue
      expect(recipeMock.addFermentable).calledWithExactly(expected)
    })

    it('Should call render after fermentable is added', () => {
      viewMock.on.withArgs(Action.ADD_FERMENTABLE).callArg(1)

      expect(viewMock.render).to.be.calledAfter(recipeMock.addFermentable)
    })
  })
})
