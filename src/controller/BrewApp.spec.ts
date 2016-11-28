import * as HopModule from '../model/Hop'
import Action from '../view/Action'
import View from '../view/View'
import BrewApp from './BrewApp'
import { expect, use } from 'chai'
import * as SinonChai from 'sinon-chai'
import { createStubInstance, stub } from 'sinon'



describe('Class BrewApp', () => {
  use(SinonChai)
  let hopStub: Sinon.SinonStub
  let viewMock: ViewMock
  let sut: BrewApp

  beforeEach(() => {
    viewMock = <ViewMock> createStubInstance(View)
    sut = new BrewApp(<any> viewMock)
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

    it('Should create a hop with values sent in event', () => {
      let viewMock: ViewMock = <ViewMock> createStubInstance(View)
      let sut: BrewApp = new BrewApp(<any> viewMock)

      // Trigger callback function when the listener is added
      viewMock.on
        .withArgs(Action.ADD_HOP)
        .yields(12,30,'Amarillo', 60)
      sut.init()

      expect(hopStub).calledWith(12,30,'Amarillo',60)
    })

    afterEach(() => {
      hopStub.restore()
    })
  })
})
