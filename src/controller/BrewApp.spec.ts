import * as HopModule from '../model/Hop'
import { Recipe } from '../model/Recipe'
import {
  getFakeStateWithoutIngredients,
  stubProperty,
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
  let viewMock: ViewMock
  let recipeMock: RecipeMock
  let sut: BrewApp

  beforeEach(() => {
    viewMock = <ViewMock> createStubInstance(View)
    recipeMock = <RecipeMock> createStubInstance(Recipe)
    sut = new BrewApp(<any> viewMock, <any> recipeMock)
  })

    describe('Method', () => {
    describe('init', () => {
      it('Should tell view to render', () => {
        sut.init()

        expect(viewMock.render).calledOnce
      })

      it('Should pass on current state to render without added ingredients', () => {
        let state: State = getFakeStateWithoutIngredients()

        recipeMock.volume = state.recipe.volume
        recipeMock.efficiency = state.recipe.efficiency
        stubProperty(recipeMock, 'expectedOG', state.recipe.expectedOG)
        stubProperty(recipeMock, 'expectedFG', state.recipe.expectedFG)
        stubProperty(recipeMock, 'expectedIBU', state.recipe.expectedIBU)
        stubProperty(recipeMock, 'expectedABV', state.recipe.expectedABV)

        sut.init()

        expect(viewMock.render.firstCall.args[0]).to.deep.equal(state)
      })

      it('Should add listener for ADD_HOPS action', () => {
        expect(viewMock.on).calledWith(Action.ADD_HOP)
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

      // Trigger callback function when the listener is added
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
})
