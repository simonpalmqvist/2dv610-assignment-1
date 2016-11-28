import * as HopModule from '../model/Hop'
import { Recipe } from '../model/Recipe'
import Action from '../view/Action'
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
      const alpha: number = 12
      const amount: number = 40
      const name: string = 'Amarillo'
      const time: number = 15

      // Trigger callback function when the listener is added
      viewMock.on
        .withArgs(Action.ADD_HOP)
        .yields(alpha, amount, name, time)
      sut.init()

      expect(hopStub).calledWithExactly(alpha, amount, name, time)
    })

    it('Should call recipe addHop with created hop', () => {
      viewMock.on
        .withArgs(Action.ADD_HOP)
        .yields()

      sut.init()

      const createdHop: Sinon.SinonStub = hopStub.firstCall.returnValue
      expect(recipeMock.addHop).calledWithExactly(createdHop)
    })
  })
})
