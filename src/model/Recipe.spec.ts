import Recipe from './Recipe'
import { expect } from 'chai'

describe('Class Recipe', function () {
  let sut: Recipe
  const newVolume: number = 10

  beforeEach(function () {
    sut = new Recipe()
  })

  describe('Property', function () {
    describe('Volume', function () {
      it('Should have default value 20', function () {
        expect(sut.volume).to.equal(20)
      })

      it('Should be able to set value', function () {
        sut.volume = newVolume

        expect(sut.volume).to.equal(newVolume)
      })
    })
  })
})
