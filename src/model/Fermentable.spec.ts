import Validate from '../validation/Validate'
import Fermentable from './Fermentable'
import { expect } from 'chai'
import { stub } from 'sinon'

describe('Class Fermentable', () => {
  let sut: Fermentable
  let validatePercentStub: Sinon.SinonStub
  let validateNotNegativeStub: Sinon.SinonStub
  const yieldPercent: number = 0.75
  const newYield: number = 0.60
  const amount: number = 3.0
  const newAmount: number = 4.0
  const name: string = 'My malt'

  beforeEach(() => {
    sut = new Fermentable(yieldPercent, amount, name)
    validatePercentStub = stub(Validate, 'percent')
    validateNotNegativeStub = stub(Validate, 'notNegative')
  })

  afterEach(() => {
    validatePercentStub.restore()
    validateNotNegativeStub.restore()
  })

  describe('Property', () => {
    describe('Yield', () => {
      it('Should be able to get value', () => {
        expect(sut.yield).to.equal(yieldPercent)
      })

      it('Should be able to set value', () => {
        sut.yield = newYield
        expect(sut.yield).to.equal(newYield)
      })

      it('Should be validated as percent', () => {
        sut.yield = newYield

        expect(validatePercentStub.calledWith(newYield)).to.be.true
      })
    })

    describe('Amount', () => {
      it('Should be able to get value', () => {
        expect(sut.amount).to.equal(amount)
      })

      it('Should be able to set value', () => {
        sut.amount = newAmount

        expect(sut.amount).to.equal(newAmount)
      })

      it('Should be validated as not negative', () => {
        sut.amount = newAmount

        expect(validateNotNegativeStub.calledWith(newAmount)).to.be.true
      })
    })

    describe('Name', () => {
      it('Should be able to get value', () => {
        expect(sut.name).to.equal(name)
      })

      it('Should be able to set value', () => {
        const newName: string = 'Pale ale-malt'

        sut.name = newName

        expect(sut.name).to.equal(newName)
      })
    })
  })

  describe('Method', () => {
    describe('calculateExpectedGravity', () => {
      it('Should be able to calculate expected gravity +/- 0.001', () => {
        sut = new Fermentable(0.78, 2, name)
        const efficiency: number = 0.65
        const volume: number = 10

        const expected: number = sut.calcExpectedOG(efficiency, volume)

        expect(expected).to.be.approximately(1.039, 0.001)
      })

      it('Should return 1.000 when no amount is added', () => {
        sut.amount = 0

        const expected: number = sut.calcExpectedOG(0.80, 10)

        expect(expected).to.equal(1.000)
      })
    })
  })
})
