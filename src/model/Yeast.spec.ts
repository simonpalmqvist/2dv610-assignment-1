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
    })
  })
})
