import InvalidValueError from '../error/InvalidValueError'
import Validate from './Validate'
import { expect } from 'chai'

describe('Class Validate', function () {

  describe('Method', function () {

    describe('percent', function () {
      it('Should throw error if negative', function () {
        expect(() => {
          Validate.percent(-0.5)
        }).to.throw(InvalidValueError)
      })

      it('Should not throw error between 0 and 1', function () {
        expect(() => {
          Validate.percent(0.55)
        }).to.not.throw(InvalidValueError)
      })

      it('Should throw error if over 1', function () {
        expect(() => {
          Validate.percent(3)
        }).to.throw(InvalidValueError)
      })
    })

    describe('notNegative', function () {
      it('Should throw error if negative', function () {
        expect(() => {
          Validate.notNegative(-200)
        }).to.throw(InvalidValueError)
      })

      it('Should not throw error if positive', function () {
        expect(() => {
          Validate.notNegative(300)
        }).to.not.throw(InvalidValueError)
      })
    })
  })
})
