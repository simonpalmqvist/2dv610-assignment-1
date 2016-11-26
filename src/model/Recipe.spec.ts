import Validate from '../validation/Validate'
import Recipe from './Recipe'
import { expect } from 'chai'
import { stub } from 'sinon'

describe('Class Recipe', () => {
  let sut: Recipe
  let validateNotNegativeStub: Sinon.SinonStub
  let validatePercentStub: Sinon.SinonStub
  const newVolume: number = 10
  const newEfficiency: number = 0.90

  beforeEach(() => {
    sut = new Recipe()
    validateNotNegativeStub = stub(Validate, 'notNegative')
    validatePercentStub = stub(Validate, 'percent')
  })

  afterEach(() => {
    validateNotNegativeStub.restore()
    validatePercentStub.restore()
  })

  describe('Property', () => {
    describe('Volume', () => {
      it('Should have default value 20', () => {
        expect(sut.volume).to.equal(20)
      })

      it('Should be able to set value', () => {
        sut.volume = newVolume

        expect(sut.volume).to.equal(newVolume)
      })

      it('Should be validated as not negative', () => {
        sut.volume = newVolume

        expect(validateNotNegativeStub.calledOnce).to.be.true
        expect(validateNotNegativeStub.args[0][0]).to.equal(newVolume)
      })
    })

    describe('Efficiency', () => {
      it('Should have default value 0.75', () => {
        expect(sut.efficiency).to.equal(0.75)
      })

      it('Should be able to set value', () => {

        sut.efficiency = newEfficiency

        expect(sut.efficiency).to.equal(newEfficiency)
      })

      it('Should be validated as percent', () => {
        sut.efficiency = newEfficiency

        expect(validatePercentStub.calledOnce).to.be.true
        expect(validatePercentStub.args[0][0]).to.equal(newEfficiency)
      })
    })
  })
})
