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
