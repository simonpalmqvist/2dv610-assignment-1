import { ConsoleUI } from './ConsoleUI'
import { View } from './View'
import { expect, use } from 'chai'
import { createStubInstance } from 'sinon'
import * as SinonChai from 'sinon-chai'

describe('Class View', () => {
  use(SinonChai)
  let stateMock: any
  let consoleUIMock: ConsoleUIMock
  let sut: View

  beforeEach(() => {
    stateMock = {}
    consoleUIMock = <ConsoleUIMock> createStubInstance(ConsoleUI)
    sut = new View(<any> consoleUIMock)
  })

  describe('Method', () => {
    describe('render', () => {
      it('Should present startup message on first render', () => {
        let message: string = 'Welcome to this beer brewing app!'

        sut.render(stateMock)

        expect(consoleUIMock.print).to.be.calledWith(message)
      })

      it('Should not present startup message second time', () => {
        sut.render(stateMock)
        sut.render(stateMock)

        expect(consoleUIMock.print).to.be.calledOnce
      })
    })
  })
})
