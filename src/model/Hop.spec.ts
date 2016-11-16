import InvalidValueError from "../error/InvalidValueError";
import Hop from './Hop'
import { expect } from 'chai'
import { suite, test } from 'mocha-typescript'

@suite
class HopTest {
  private alpha: number = 14.4
  private amount: number = 10
  private sut: Hop

  public before () : void {
    this.sut = new Hop(this.alpha, this.amount)
  }

  @test
  public shouldBeAbleToGetPropertyAlpha () : void {
    expect(this.sut.alpha).to.equal(this.alpha)
  }

  @test
  public shouldBeAbleToSetPropertyAlpha () : void {
    let newAlpha: number = 10.0

    this.sut.alpha = newAlpha

    expect(this.sut.alpha).to.equal(newAlpha)
  }

  @test
  public shouldNotBeAbleToSetPropertyAlphaToNegativeValue () : void {
    this.expectCallToThrowInvalidValueError(() => this.sut.alpha = -2.0)

    expect(this.sut.alpha).to.equal(this.alpha)
  }

  @test
  public shouldNotBeAbleToSetPropertyAlphaToValueLargerThan100 () : void {
    this.expectCallToThrowInvalidValueError(() => this.sut.alpha = 100.5)

    expect(this.sut.alpha).to.equal(this.alpha)
  }

  @test
  public shouldBeAbleToGetPropertyAmount () : void {
    expect(this.sut.amount).to.equal(this.amount)
  }

  @test
  public shouldBeAbleToSetPropertyAmount () : void {
    let newAmount: number = 300.0

    this.sut.amount = newAmount

    expect(this.sut.amount).to.equal(newAmount)
  }

  private expectCallToThrowInvalidValueError (call: () => any) : void {
    expect(call).to.throw(InvalidValueError)
  }
}
