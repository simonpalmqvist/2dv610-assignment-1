import Validate from '../validation/Validate'
import Fermentable from './Fermentable'
import { expect } from 'chai'
import { stub } from 'sinon'

describe('Class Fermentable', function () {
  let sut: Fermentable
  let validatePercentStub: Sinon.SinonStub
  const yieldPercent: number = 0.75
  const newYield: number = 0.60
  const amount: number = 3.0

  beforeEach(function () {
    sut = new Fermentable(yieldPercent)
    validatePercentStub = stub(Validate, 'percent')
  })

  afterEach(function () {
    validatePercentStub.restore()
  })

  describe('Property', function () {
    describe('Yield', function () {
      it('Should be able to get value', function () {
        expect(sut.yield).to.equal(yieldPercent)
      })

      it('Should be able to set value', function () {
        sut.yield = newYield
        expect(sut.yield).to.equal(newYield)
      })

      it('Should be validated as percent', function () {
        sut.yield = newYield

        expect(validatePercentStub.args[0][0]).to.equal(newYield)
        expect(validatePercentStub.calledOnce).to.be.true
      })
    })

    describe('Amount', function () {
      it('Should be able to get value', function () {
        expect(sut.amount).to.equal(amount)
      })
    })
  })
})
