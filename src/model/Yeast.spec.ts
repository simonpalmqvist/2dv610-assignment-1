import Validate from '../validation/Validate'
import Yeast from './Yeast'
import { expect } from 'chai'
import { stub } from 'sinon'

describe('Class Yeast', () => {
  let sut: Yeast
  let validatePercentStub: Sinon.SinonStub
  const name: string = 'My yeast'
  const attenuation: number = 0.75
  const newAttenuation: number = 0.90

  beforeEach(() => {
    sut = new Yeast(name, attenuation)
    validatePercentStub = stub(Validate, 'percent')
  })

  afterEach(() => {
    validatePercentStub.restore()
  })

  describe('Property', () => {
    describe('Name', () => {
      it('Should be able to get value', () => {
        expect(sut.name).to.equal(name)
      })

      it('Should be able to set value', () => {
        sut.name = 'West Coast M44'
        expect(sut.name).to.equal('West Coast M44')
      })
    })

    describe('Attenuation', () => {
      it('Should be able to get value', () => {
        expect(sut.attenuation).to.equal(attenuation)
      })

      it('Should be able to set value', () => {
        sut.attenuation = newAttenuation

        expect(sut.attenuation).to.equal(newAttenuation)
      })

      it('Should be validated as percent', () => {
        sut.attenuation = newAttenuation

        expect(validatePercentStub.calledOnce).to.be.true
        expect(validatePercentStub.args[0][0]).to.equal(newAttenuation)
      })
    })
  })
})
