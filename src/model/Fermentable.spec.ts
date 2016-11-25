import Fermentable from './Fermentable'
import { expect } from 'chai'
import { suite, test } from 'mocha-typescript'

@suite
class FermentableTest {
  private sut: Fermentable
  private yield: number = 0.75

  public before () {
    this.sut = new Fermentable()
  }

  @test
  public shouldBeAbleToGetPropertyYield () : void {
    expect(this.sut.yield).to.equal(this.yield)
  }
}
