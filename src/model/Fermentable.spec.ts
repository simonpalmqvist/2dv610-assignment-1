import Validate from '../validation/Validate'
import Fermentable from './Fermentable'
import { expect } from 'chai'
import { stub } from 'sinon'

describe('Class Fermentable', function () {
  let sut: Fermentable
  let validatePercentStub: Sinon.SinonStub
  let validateNotNegativeStub: Sinon.SinonStub
  const yieldPercent: number = 0.75
  const newYield: number = 0.60
  const amount: number = 3.0
  const newAmount: number = 4.0
  const name: string = 'My malt'

  beforeEach(function () {
    sut = new Fermentable(yieldPercent, amount, name)
    validatePercentStub = stub(Validate, 'percent')
    validateNotNegativeStub = stub(Validate, 'notNegative')
  })

  afterEach(function () {
    validatePercentStub.restore()
    validateNotNegativeStub.restore()
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

        expect(validatePercentStub.calledOnce).to.be.true
        expect(validatePercentStub.args[0][0]).to.equal(newYield)
      })
    })

    describe('Amount', function () {
      it('Should be able to get value', function () {
        expect(sut.amount).to.equal(amount)
      })

      it('Should be able to set value', function () {
        sut.amount = newAmount

        expect(sut.amount).to.equal(newAmount)
      })

      it('Should be validated as not negative', function () {
        sut.amount = newAmount

        expect(validateNotNegativeStub.calledOnce).to.be.true
        expect(validateNotNegativeStub.args[0][0]).to.equal(newAmount)
      })
    })

    describe('Name', function () {
      it('Should be able to get value', function () {
        expect(sut.name).to.equal(name)
      })

      it('Should be able to set value', function () {
        const newName = 'Pale ale-malt'

        sut.name = newName

        expect(sut.name).to.equal(newName)
      })
    })
  })

  describe('Method', function () {
    describe('calculateExpectedGravity', function () {
      it('Should be able to calculate expected gravity +/- 0.001', function () {
        sut = new Fermentable(0.78, 2, name)
        const efficiency: number = 0.80
        const volume: number = 10

        const expected = sut.calculateExpectedGravity(efficiency, volume)

        expect(expected).to.be.approximately(1.048, 0.001)
      })
    })
  })
})
