import Yeast from './Yeast'
import { expect } from 'chai'

describe('Class Yeast', function () {
  describe('Property', function () {
    describe('Name', function () {
      it('Should be able to get value', function () {
        const sut = new Yeast()
        expect(sut.name).to.equal('My yeast')
      })
    })
  })
})
