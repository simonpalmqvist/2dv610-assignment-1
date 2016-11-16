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
}
