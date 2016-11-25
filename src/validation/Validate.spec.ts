import InvalidValueError from '../error/InvalidValueError'
import Validate from './Validate'
import { expect } from 'chai'

describe('Class Validate', () => {

  describe('Method', () => {

    describe('percent', () => {
      it('Should throw error if negative', () => {
        expect(() => {
          Validate.percent(-0.5)
        }).to.throw(InvalidValueError)
      })

      it('Should not throw error between 0 and 1', () => {
        expect(() => {
          Validate.percent(0.55)
        }).to.not.throw(InvalidValueError)
      })

      it('Should throw error if over 1', () => {
        expect(() => {
          Validate.percent(3)
        }).to.throw(InvalidValueError)
      })
    })

    describe('notNegative', () => {
      it('Should throw error if negative', () => {
        expect(() => {
          Validate.notNegative(-200)
        }).to.throw(InvalidValueError)
      })

      it('Should not throw error if positive', () => {
        expect(() => {
          Validate.notNegative(300)
        }).to.not.throw(InvalidValueError)
      })
    })
  })
})
