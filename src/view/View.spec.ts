import { ConsoleUI } from './ConsoleUI'
import { View } from './View'
import { expect, use } from 'chai'
import { createStubInstance, spy } from 'sinon'
import * as SinonChai from 'sinon-chai'

describe('Class View', () => {
  use(SinonChai)

  describe('Method', () => {
    describe('render', () => {
      it('Should present startup message on first render', () => {
        let message: string = 'Welcome to this beer brewing app!'
        let consoleUIMock: ConsoleUIMock = <ConsoleUIMock> createStubInstance(ConsoleUI)
        let sut: View = new View(<any> consoleUIMock)

        sut.render(<any> {})

        expect(consoleUIMock.print).to.be.calledWith(message)
      })

      it('Should not present startup message second time', () => {
        let stateMock: any = {}
        let consoleUIMock: ConsoleUIMock = <ConsoleUIMock> createStubInstance(ConsoleUI)
        let sut: View = new View(<any> consoleUIMock)

        sut.render(stateMock)
        sut.render(stateMock)

        expect(consoleUIMock.print).to.be.calledOnce
      })
    })
  })
})
