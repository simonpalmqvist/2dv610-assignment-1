import Example from './Example'
import { expect } from 'chai'
import { suite, test, slow, timeout, skip, only } from "mocha-typescript"

@suite
class ExampleTest {

  private sut: Example
  private expected: number = 3

  public before () : void {
    this.sut = new Example(this.expected)
  }

  @test
  public shouldSetNumber () : void {
    this.assertExampleNumber(this.expected)
  }

  @test
  public shouldBeAbleToMultiplyNumber () : void {
    this.sut.double()
    this.assertExampleNumber(this.expected * 2)
  }

  private assertExampleNumber (expected: number) : void {
    expect(this.sut.number).to.equal(expected)
  }
}
