import * as HopModule from '../model/Hop'
import { Recipe } from '../model/Recipe'
import Action from '../view/Action'
import { State } from '../view/State'
import { View } from '../view/View'
import { stubProperty } from '../test/helper'
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
        recipeMock.volume = 2
        recipeMock.efficiency = 0.8
        stubProperty(recipeMock, 'expectedOG', 1.050)
        stubProperty(recipeMock, 'expectedFG', 1.010)
        stubProperty(recipeMock, 'expectedIBU', 36)
        stubProperty(recipeMock, 'expectedABV', 0.48)

        let state: State = {
          recipe: {
            volume: 2,
            efficiency: 0.8,
            expectedOG: 1.050,
            expectedFG: 1.010,
            expectedIBU: 36,
            expectedABV: 0.48,
            hops: [],
            fermentables: []
          }
        }

        sut.init()

        expect(viewMock.render.firstCall.args[0]).to.deep.equal(state)
      })

      it('Should add listener for ADD_HOPS action', () => {
        sut.init()

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
      const args = [12, 40, 'Amarillo', 15]

      // Trigger callback function when the listener is added
      viewMock.on.withArgs(Action.ADD_HOP).yields(...args)
      sut.init()

      expect(hopStub).calledWithExactly(...args)
    })

    it('Should call recipe addHop with created hop', () => {
      viewMock.on.withArgs(Action.ADD_HOP).yields()
      sut.init()

      const createdHop: Sinon.SinonStub = hopStub.firstCall.returnValue
      expect(recipeMock.addHop).calledWithExactly(createdHop)
    })
  })
})
