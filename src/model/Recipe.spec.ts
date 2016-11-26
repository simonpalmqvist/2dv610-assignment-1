import Validate from '../validation/Validate'
import Fermentable from './Fermentable'
import Hop from './Hop'
import Recipe from './Recipe'
import Yeast from './Yeast'
import { expect } from 'chai'
import { stub, mock } from 'sinon'

describe('Class Recipe', () => {
  let sut: Recipe
  let validateNotNegativeStub: Sinon.SinonStub
  let validatePercentStub: Sinon.SinonStub
  let yeastMock: Sinon.SinonMock
  let hopMock: Sinon.SinonMock
  let fermentableMock: Sinon.SinonMock
  const newVolume: number = 10
  const newEfficiency: number = 0.90


  beforeEach(() => {
    sut = new Recipe()
    validateNotNegativeStub = stub(Validate, 'notNegative')
    validatePercentStub = stub(Validate, 'percent')
    yeastMock = mock(Yeast)
    hopMock = mock(Hop)
    fermentableMock = mock(Fermentable)
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

        hops.push(<any> hopMock)

        expect(hops).to.have.length(1)
        expect(sut.hops).to.have.length(0)
      })
    })

    describe('Fermentable', () => {
      it('Should be an empty array as default', () => {
        expect(sut.fermentables).to.be.an.instanceof(Array)
        expect(sut.fermentables).to.have.length(0)
      })

      it('Should return a copy of the array', () => {
        const fermentables: Fermentable[] = sut.fermentables

        fermentables.push(<any> mock(Fermentable))

        expect(fermentables).to.have.length(1)
        expect(sut.fermentables).to.have.length(0)
      })
    })
  })

  describe('Method', () => {
    describe('addHop', () => {
      it('Should be able to add one hop', () => {
        sut.addHop(<any> hopMock)

        expect(sut.hops).to.have.length(1)
        expect(sut.hops).to.contain(hopMock)
      })

      it('Should be able to add several hops', () => {
        sut.addHop(<any> hopMock)
        sut.addHop(<any> hopMock)

        expect(sut.hops).to.have.length(2)
        expect(sut.hops).to.contain(hopMock)
      })
    })

    describe('addFermentable', () => {
      it('Should be able to add one fermentable', () => {
        sut.addFermentable(<any> fermentableMock)

        expect(sut.fermentables).to.have.length(1)
        expect(sut.fermentables).to.contain(fermentableMock)
      })
    })
  })
})
