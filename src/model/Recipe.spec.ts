import Validate from '../validation/Validate'
import Yeast from './Yeast'
import Hop from './Hop'
import Recipe from './Recipe'
import { expect } from 'chai'
import { stub, mock } from 'sinon'

describe('Class Recipe', () => {
  let sut: Recipe
  let validateNotNegativeStub: Sinon.SinonStub
  let validatePercentStub: Sinon.SinonStub
  let yeastMock: Sinon.SinonMock
  const newVolume: number = 10
  const newEfficiency: number = 0.90

  beforeEach(() => {
    sut = new Recipe()
    validateNotNegativeStub = stub(Validate, 'notNegative')
    validatePercentStub = stub(Validate, 'percent')
    yeastMock = mock(Yeast)
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

        expect(validateNotNegativeStub.calledWith(newVolume)).to.be.true
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

        expect(validatePercentStub.calledWith(newEfficiency)).to.be.true
      })
    })

    describe('Yeast', () => {
      it('Should be able to set yeast', () => {
        sut.yeast = <any> yeastMock

        expect(sut.yeast).to.equal(yeastMock)
      })
    })

    describe('Hops', () => {
      it('Should be an empty array as default', () => {
        expect(sut.hops).to.be.an.instanceof(Array)
        expect(sut.hops).to.have.length(0)
      })

      it('Should return a copy of the array', () => {
        const hops: Hop[] = sut.hops

        hops.push(<any> mock(Hop))

        expect(hops).to.have.length(1)
        expect(sut.hops).to.have.length(0)
      })
    })
  })


})
