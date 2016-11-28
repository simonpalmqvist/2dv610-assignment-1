import * as HopModule from '../model/Hop'
import Recipe from '../model/Recipe'
import Action from '../view/Action'
import View from '../view/View'
import BrewApp from './BrewApp'
import { expect, use } from 'chai'
import * as SinonChai from 'sinon-chai'
import { createStubInstance, spy, stub } from 'sinon'

describe('Class BrewApp', () => {
  use(SinonChai)
  let HopStub: Sinon.SinonStub
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
      HopStub = stub(HopModule, 'Hop')
    })
    afterEach(() => {
      HopStub.restore()
    })


    it('Should create a hop with values sent in event', () => {
      const alpha = 12
      const amount = 40
      const name = 'Amarillo'
      const time = 15

      // Trigger callback function when the listener is added
      viewMock.on
        .withArgs(Action.ADD_HOP)
        .yields(alpha, amount, name, time)
      sut.init()

      expect(HopStub).calledWithExactly(alpha, amount, name, time)
    })

    it('Should call recipe addHop with created hop', () => {
      viewMock.on
        .withArgs(Action.ADD_HOP)
        .yields()

      sut.init()

      const createdHop = HopStub.firstCall.returnValue

      expect(recipeMock.addHop).calledWithExactly(createdHop)
    })
  })
})
