import InvalidValueError from '../error/InvalidValueError'
import Validate from './Validate'
import { expect } from 'chai'
import { suite, test } from 'mocha-typescript'

@suite
class ValidateTest {

  @test
  public shouldThrowErrorIfPercentIsNegative () : void {
    expect(() => {
      Validate.percent(-0.5)
    }).to.throw(InvalidValueError)
  }

  @test
  public shouldNotThrowErrorIfPercentIsWithin0To1 () : void {
    expect(() => {
      Validate.percent(0.57)
    }).to.not.throw(InvalidValueError)
  }

  @test
  public shouldThrowErrorIfPercentIsOver1 () : void {
    expect(() => {
      Validate.percent(3)
    }).to.throw(InvalidValueError)
  }

  @test
  public shouldThrowErrorIfNegative () : void {
    expect(() => {
      Validate.notNegative(-200)
    }).to.throw(InvalidValueError)
  }

  @test
  public shouldNotThrowErrorIfNotNegative () : void {
    expect(() => {
      Validate.notNegative(300)
    }).to.not.throw(InvalidValueError)
  }
}
