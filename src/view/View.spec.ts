import { ConsoleUI } from './ConsoleUI'
import { View } from './View'
import { expect, use } from 'chai'
import { createStubInstance, spy } from 'sinon'
import * as SinonChai from 'sinon-chai'

describe('Class View', () => {
  use(SinonChai)

  describe('Method', () => {
    describe('render', () => {
      it('Should present startup message on first call', () => {
        let message: string = 'Welcome to this beer brewing app!'
        let consoleUIMock: ConsoleUIMock = <ConsoleUIMock> createStubInstance(ConsoleUI)
        let sut: View = new View(<any> consoleUIMock)

        sut.render(<any> {})

        expect(consoleUIMock.print).to.be.calledWith(message)
      })
    })
  })
})
