import Action from '../view/Action'
import View from '../view/View'
import BrewApp from './BrewApp'
import { expect } from 'chai'
import { createStubInstance } from 'sinon'

describe('Class BrewApp', () => {
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

        expect(viewMock.render.calledOnce).to.be.true
      })

      it('Should add listener for ADD_HOPS action', () => {
        sut.init()

        expect(viewMock.on.calledWith(Action.ADD_HOP)).to.be.true
      })
    })
  })
})
