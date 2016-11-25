import Yeast from './Yeast'
import { expect } from 'chai'

describe('Class Yeast', function () {
  let sut: Yeast
  const name: string = 'My yeast'

  beforeEach(function () {
    sut = new Yeast(name)
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
        expect(sut.attenuation).to.equal(0.75)
      })
    })
  })
})
