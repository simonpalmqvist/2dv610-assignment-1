import Hop from './Hop'
import { expect } from 'chai'
import { suite, test } from 'mocha-typescript'

@suite
class HopTest {

  @test
  public shouldBeAbleToGetPropertyAlphaAcid () : void {
    let alpha: number = 14.4
    let sut: Hop = new Hop()

    expect(sut.alpha).to.equal(alpha)
  }
}
