import { stubProperty } from '../test/helper'
import Validate from '../validation/Validate'
import Fermentable from './Fermentable'
import Hop from './Hop'
import Recipe from './Recipe'
import Yeast from './Yeast'
import { expect } from 'chai'
import { createStubInstance, stub } from 'sinon'

describe('Class Recipe', () => {
  let sut: Recipe
  let validateNotNegativeStub: Sinon.SinonStub
  let validatePercentStub: Sinon.SinonStub
  let yeastMock: YeastMock
  let hopMock: HopMock
  let fermentableMock: FermentableMock
  const newVolume: number = 10
  const newEfficiency: number = 0.90

  beforeEach(() => {
    sut = new Recipe()
    validateNotNegativeStub = stub(Validate, 'notNegative')
    validatePercentStub = stub(Validate, 'percent')
    yeastMock = <YeastMock> createStubInstance(Yeast)
    hopMock = <HopMock> createStubInstance(Hop)
    fermentableMock = <FermentableMock> createStubInstance(Fermentable)
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

    describe('Fermentables', () => {
      it('Should be an empty array as default', () => {
        expect(sut.fermentables).to.be.an.instanceof(Array)
        expect(sut.fermentables).to.have.length(0)
      })

      it('Should return a copy of the array', () => {
        const fermentables: Fermentable[] = sut.fermentables

        fermentables.push(<any> fermentableMock)

        expect(fermentables).to.have.length(1)
        expect(sut.fermentables).to.have.length(0)
      })
    })

    describe('expectedOG', () => {
      it('Should add fermentables expected gravity +/- 0.001', () => {
        fermentableMock.calcExpectedOG.returns(1.025)

        sut.addFermentable(<any> fermentableMock)
        sut.addFermentable(<any> fermentableMock)

        expect(sut.expectedOG).to.be.approximately(1.050, 0.001)
        expect(fermentableMock.calcExpectedOG.calledWith(sut.efficiency, sut.volume)).to.be.true
      })

      it('Should return 1 when fermentables is empty', () => {
        expect(sut.expectedOG).to.equal(1)
      })
    })

    describe('expectedFG', () => {
      it('Should calculate correct gravity +/- 0.001', () => {
        yeastMock.attenuation = 0.75
        sut.yeast = <any> yeastMock
        stubProperty(sut, 'expectedOG', 1.040)

        expect(sut.expectedFG).to.be.approximately(1.010, 0.001)
      })

      it('Should show expectedOG when no Yeast is added', () => {
        stubProperty(sut, 'expectedOG', 1.030)

        expect(sut.expectedFG).to.equal(1.030)
      })
    })

    describe('expectedIBU', () => {
      it('Should calculate correct ibu', () => {
        hopMock.calculateIBU.returns(34)

        sut.addHop(<any> hopMock)
        sut.addHop(<any> hopMock)

        expect(sut.expectedIBU).to.equal(68)
        expect(hopMock.calculateIBU.calledWith(sut.expectedOG, sut.volume)).to.be.true
      })

      it('Should return 0 if no hops is added', () => {
        expect(sut.expectedIBU).to.equal(0)
      })
    })

    describe('expectedABV', () => {
      it('Should return correct abv on lower gravitys +/- 0.1', () => {
        stubProperty(sut, 'expectedOG', 1.050)
        stubProperty(sut, 'expectedFG', 1.010)

        expect(sut.expectedABV).to.be.approximately(5.3, 0.1)
      })

      it('Should return correct abv on higher gravitys +/- 0.1', () => {
        stubProperty(sut, 'expectedOG', 1.080)
        stubProperty(sut, 'expectedFG', 1.010)

        expect(sut.expectedABV).to.be.approximately(9.8, 0.1)
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

      it('Should be able to add several fermentables', () => {
        sut.addFermentable(<any> fermentableMock)
        sut.addFermentable(<any> fermentableMock)

        expect(sut.fermentables).to.have.length(2)
        expect(sut.fermentables).to.contain(fermentableMock)
      })
    })
  })
})
