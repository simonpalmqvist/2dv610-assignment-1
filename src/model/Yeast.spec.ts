import Yeast from './Yeast'
import Validate from '../validation/Validate'
import { expect } from 'chai'
import { stub } from 'sinon'

describe('Class Yeast', function () {
  let sut: Yeast
  let validatePercentStub: Sinon.SinonStub
  const name: string = 'My yeast'
  const attenuation: number = 0.75
  const newAttenuation: number = 0.90

  beforeEach(function () {
    sut = new Yeast(name, attenuation)
    validatePercentStub = stub(Validate, 'percent')
  })

  afterEach(function () {
    validatePercentStub.restore()
  })

  describe('Property', function () {
    describe('Name', function () {
      it('Should be able to get value', function () {
        expect(sut.name).to.equal(name)
      })

      it('Should be able to set value', function () {
        sut.name = 'West Coast M44'
        expect(sut.name).to.equal('West Coast M44')
      })
    })

    describe('Attenuation', function () {
      it('Should be able to get value', function () {
        expect(sut.attenuation).to.equal(attenuation)
      })

      it('Should be able to set value', function () {
        sut.attenuation = newAttenuation

        expect(sut.attenuation).to.equal(newAttenuation)
      })

      it('Should be validated as percent', function () {
        sut.attenuation = newAttenuation

        expect(validatePercentStub.calledOnce).to.be.true
        expect(validatePercentStub.args[0][0]).to.equal(newAttenuation)
      })
    })
  })
})
