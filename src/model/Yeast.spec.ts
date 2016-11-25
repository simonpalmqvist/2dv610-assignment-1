import Yeast from './Yeast'
import { expect } from 'chai'

describe('Class Yeast', function () {
  let sut: Yeast
  const name: string = 'My yeast'
  const attenuation: number = 0.75
  const newAttenuation: number = 0.90

  beforeEach(function () {
    sut = new Yeast(name, attenuation)
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
    })
  })
})
