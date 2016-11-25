import Validate from '../validation/Validate'
import Hop from './Hop'
import { expect } from 'chai'
import { suite, test } from 'mocha-typescript'
import { stub } from 'sinon'

@suite
class HopTest {
  private alpha: number = 0.14
  private amount: number = 10
  private name: string = 'My Hop'
  private time: number = 60
  private sut: Hop
  private validatePercentStub: Sinon.SinonStub
  private validateNotNegativeStub: Sinon.SinonStub

  public before () : void {
    this.sut = new Hop(this.alpha, this.amount, this.name, this.time)
    this.validatePercentStub = stub(Validate, 'percent')
    this.validateNotNegativeStub = stub(Validate, 'notNegative')
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
    const newAlpha = 0.30
    this.sut.alpha = newAlpha
    expect(this.validatePercentStub.args[0][0]).to.equal(newAlpha)
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
    const newAmount = 400
    this.sut.amount = newAmount

    expect(this.validateNotNegativeStub.args[0][0]).to.equal(newAmount)
    expect(this.validateNotNegativeStub.calledOnce).to.be.true
  }

  @test
  public shouldBeAbleToGetPropertyName () : void {
    expect(this.sut.name).to.equal(this.name)
  }

  @test
  public shouldBeAbleToSetPropertyName () : void {
    let newName: string = 'My super hop'

    this.sut.name = newName

    expect(this.sut.name).to.equal(newName)
  }

  @test
  public shouldBeAbleToGetPropertyTime () : void {
    expect(this.sut.time).to.equal(this.time)
  }

  @test
  public shouldBeAbleToSetPropertyTime () : void {
    let newTime: number = this.time * 2

    this.sut.time = newTime

    expect(this.sut.time).to.equal(newTime)
  }

  @test
  public shouldValidateTimeWithNotNegative () : void {
    const newTime = 30
    this.sut.time = newTime
    expect(this.validateNotNegativeStub.args[0][0]).to.equal(newTime)
    expect(this.validateNotNegativeStub.calledOnce).to.be.true
  }

  @test
  public shouldBeAbleToCalculateIBU () : void {
    const gravity: number = 1.050
    const wortVolume: number = 10

    const expected: number = this.sut.calculateIBU(gravity, wortVolume)

    expect(expected).to.be.approximately(32.3, 0.1)
  }
}
