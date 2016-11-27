import View from '../view/View'
import BrewApp from './BrewApp'
import { expect } from 'chai'
import { createStubInstance } from 'sinon'

describe('Class BrewApp', () => {
  describe('Method', () => {
    describe('start', () => {
      it('Should tell view to render', () => {
        let viewMock: ViewMock = <ViewMock> createStubInstance(View)
        let sut: BrewApp = new BrewApp(<any> viewMock)

        sut.init()

        expect(viewMock.render.calledOnce).to.be.true
      })
    })
  })
})
