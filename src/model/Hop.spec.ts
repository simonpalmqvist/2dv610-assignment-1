import Validate from '../validation/Validate'
import Hop from './Hop'
import { expect } from 'chai'
import { suite, test } from 'mocha-typescript'
import { stub } from 'sinon'

@suite
class HopTest {
  private alpha: number = 14.4
  private amount: number = 10
  private name: string = 'My Recipe'
  private time: number = 60
  private sut: Hop
  private validatePercentStub: Sinon.SinonStub
  private validateNotNegativeStub: Sinon.SinonStub

  public before () : void {
    this.validatePercentStub = stub(Validate, 'percent')
    this.validateNotNegativeStub = stub(Validate, 'notNegative')
    this.sut = new Hop(this.alpha, this.amount, this.name)
  }

  public after () : void {
    this.validatePercentStub.restore()
    this.validateNotNegativeStub.restore()
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
  public shouldValidateAlphaAsPercent () : void {
    expect(this.validatePercentStub.calledOnce).to.be.true
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

  @test
  public shouldValidateAmountWithNotNegative () : void {
    expect(this.validateNotNegativeStub.calledOnce).to.be.true
  }

  @test
  public shouldBeAbleToGetPropertyName () : void {
    expect(this.sut.name).to.equal(this.name)
  }

  @test
  public shouldBeAbleToSetPropertyName () : void {
    let newName: string = "My super recipe"

    this.sut.name = newName

    expect(this.sut.name).to.equal(newName)
  }

  @test
  public shouldBeAbleToGetPropertyTime () : void {
    expect(this.sut.time).to.equal(this.time)
  }
}
