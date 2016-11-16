import Hop from './Hop'
import { expect } from 'chai'
import { suite, test } from 'mocha-typescript'

@suite
class HopTest {

  @test
  public shouldBeAbleToGetPropertyAlpha () : void {
    let alpha: number = 14.4
    let sut: Hop = new Hop(alpha)

    expect(sut.alpha).to.equal(alpha)
  }

  @test
  public shouldBeAbleToSetPropertyAlpha () : void {
    let alpha: number = 14.4
    let sut: Hop = new Hop(alpha)
    let newAlpha: number = 10.0

    sut.alpha = newAlpha

    expect(sut.alpha).to.equal(newAlpha)
  }
}
