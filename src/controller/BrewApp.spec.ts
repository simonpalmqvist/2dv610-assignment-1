import Action from '../view/Action'
import View from '../view/View'
import BrewApp from './BrewApp'
import { expect } from 'chai'
import { createStubInstance } from 'sinon'

describe('Class BrewApp', () => {

  describe('Method', () => {
    describe('init', () => {
      it('Should tell view to render', () => {
        let viewMock: ViewMock = <ViewMock> createStubInstance(View)
        let sut: BrewApp = new BrewApp(<any> viewMock)

        sut.init()

        expect(viewMock.render.calledOnce).to.be.true
      })

      it('Should add listener for ADD_HOPS action', () => {
        let viewMock: ViewMock = <ViewMock> createStubInstance(View)
        let sut: BrewApp = new BrewApp(<any> viewMock)

        sut.init()

        expect(viewMock.on.calledWith(Action.ADD_HOP)).to.be.true
      })
    })
  })
})
