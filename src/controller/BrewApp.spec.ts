import View from '../view/View'
import BrewApp from './BrewApp'
import { expect } from 'chai'
import { createStubInstance } from 'sinon'

describe('Class BrewApp', () => {
  let viewMock: ViewMock = <ViewMock> createStubInstance(View)
  let sut: BrewApp = new BrewApp(<any> viewMock)

  describe('Method', () => {
    describe('init', () => {
      it('Should tell view to render', () => {
        sut.init()

        expect(viewMock.render.calledOnce).to.be.true
      })
    })
  })
})
