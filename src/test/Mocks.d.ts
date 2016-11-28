declare interface FermentableMock extends Sinon.SinonStub {
  calcExpectedOG: Sinon.SinonStub
}

declare interface HopMock extends Sinon.SinonStub {
  calculateIBU: Sinon.SinonStub
}

declare interface YeastMock extends Sinon.SinonStub {
  attenuation: number
}

declare interface ViewMock extends Sinon.SinonStub {
  render: Sinon.SinonStub
  on: Sinon.SinonStub
}

declare interface RecipeMock extends Sinon.SinonStub {
  volume: number
  efficiency: number
  expectedOG: Sinon.SinonStub
  expectedFG: Sinon.SinonStub
  expectedIBU: Sinon.SinonStub
  expectedABV: Sinon.SinonStub
  addHop: Sinon.SinonStub
  addFermentable: Sinon.SinonStub
}
