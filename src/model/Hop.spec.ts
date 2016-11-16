import InvalidValueError from "../error/InvalidValueError";
import Hop from './Hop'
import { expect } from 'chai'
import { suite, test } from 'mocha-typescript'

@suite
class HopTest {
  private alpha: number = 14.4
  private sut: Hop

  public before () : void {
    this.sut = new Hop(this.alpha)
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
    expect(() => {
      this.sut.alpha = -2.0
    }).to.throw(InvalidValueError)

    expect(this.sut.alpha).to.equal(this.alpha)
  }
}
