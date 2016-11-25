import Validate from '../validation/Validate'
import Fermentable from './Fermentable'
import { expect } from 'chai'
import { suite, test } from 'mocha-typescript'
import { stub } from 'sinon'

@suite
class FermentableTest {
  private sut: Fermentable
  private yield: number = 0.75
  private validatePercentStub: Sinon.SinonStub

  public before () : void {
    this.sut = new Fermentable(this.yield)
    this.validatePercentStub = stub(Validate, 'percent')
  }

  public after () : void {
    this.validatePercentStub.restore()
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

  @test
  public shouldValidateYieldAsPercent () : void {
    const newYield = 0.60
    this.sut.yield = newYield

    expect(this.validatePercentStub.args[0][0]).to.equal(newYield)
    expect(this.validatePercentStub.calledOnce).to.be.true
  }
}
