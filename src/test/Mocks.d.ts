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

declare interface ConsoleMock extends Sinon.SinonStub {
  log: Sinon.SinonStub
}

declare interface ReadlineMock extends Sinon.SinonStub {
  on: Sinon.SinonStub
  close: Sinon.SinonStub
  question: Sinon.SinonStub
}

declare interface ConsoleUIMock extends Sinon.SinonStub {
  print: Sinon.SinonStub
  registerInputHandler: Sinon.SinonStub
  askQuestion: Sinon.SinonStub
}

declare interface RecipeViewMock extends Sinon.SinonStub {
  showAddHopsForm: Sinon.SinonStub
}
