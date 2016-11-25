import Fermentable from './Fermentable'
import { expect } from 'chai'
import { suite, test } from 'mocha-typescript'

@suite
class FermentableTest {

  @test
  public shouldBeAbleToGetPropertyYield () : void {
    const sut: Fermentable = new Fermentable()

    expect(sut.yield).to.equal(0.75)
  }
}
