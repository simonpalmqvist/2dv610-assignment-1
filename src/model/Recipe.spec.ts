import Recipe from './Recipe'
import { expect } from 'chai'

describe('Class Recipe', function () {
  describe('Property', function () {
    describe('Volume', function () {
      it('Should be able to get value', function () {
        let sut: Recipe = new Recipe()

        expect(sut.volume).to.equal(10)
      })
    })
  })
})
