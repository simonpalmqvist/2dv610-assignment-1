import Recipe from './Recipe'
import { expect } from 'chai'

describe('Class Recipe', function () {
  let sut: Recipe
  const volume: number = 10

  beforeEach(function () {
    sut = new Recipe()
  })

  describe('Property', function () {
    describe('Volume', function () {
      it('Should be able to get value', function () {
        expect(sut.volume).to.equal(volume)
      })
    })
  })
})
