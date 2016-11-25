import Fermentable from './Fermentable'
import { expect } from 'chai'
import { suite, test } from 'mocha-typescript'

@suite
class FermentableTest {
  private sut: Fermentable
  private yield: number = 0.75

  public before () {
    this.sut = new Fermentable(this.yield)
  }

  @test
  public shouldBeAbleToGetPropertyYield () : void {
    expect(this.sut.yield).to.equal(this.yield)
  }

  @test
  public shouldBeAbleToSetPropertyAlpha () : void {
    let newYield: number = 0.3

    this.sut.yield = newYield

    expect(this.sut.yield).to.equal(newYield)
  }
}
