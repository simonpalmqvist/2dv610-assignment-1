import Recipe from './Recipe'
import Validate from '../validation/Validate'
import { expect } from 'chai'
import { stub } from 'sinon'

describe('Class Recipe', function () {
  let sut: Recipe
  let validateNotNegativeStub: Sinon.SinonStub
  const newVolume: number = 10

  beforeEach(function () {
    sut = new Recipe()
    validateNotNegativeStub = stub(Validate, 'notNegative')
  })

  afterEach(function () {
    validateNotNegativeStub.restore()
  })

  describe('Property', function () {
    describe('Volume', function () {
      it('Should have default value 20', function () {
        expect(sut.volume).to.equal(20)
      })

      it('Should be able to set value', function () {
        sut.volume = newVolume

        expect(sut.volume).to.equal(newVolume)
      })

      it('Should be validated as not negative', function () {
        sut.volume = newVolume

        expect(validateNotNegativeStub.calledOnce).to.be.true
        expect(validateNotNegativeStub.args[0][0]).to.equal(newVolume)
      })
    })
  })
})
