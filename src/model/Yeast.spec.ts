import Yeast from './Yeast'
import { expect } from 'chai'

describe('Class Yeast', function () {
  let sut: Yeast

  beforeEach(function () {
    sut = new Yeast()
  })

  describe('Property', function () {
    describe('Name', function () {
      it('Should be able to get value', function () {
        expect(sut.name).to.equal('My yeast')
      })

      it('Should be able to set value', function () {
        sut.name = 'West Coast M44'
        expect(sut.name).to.equal('West Coast M44')
      })
    })
  })
})
