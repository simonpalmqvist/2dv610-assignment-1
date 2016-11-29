import { ConsoleUI } from './ConsoleUI'
import { expect, use } from 'chai'
import * as readline from 'readline'
import { createStubInstance, spy } from 'sinon'
import * as SinonChai from 'sinon-chai'

describe('Class ConsoleUI', () => {
  use(SinonChai)

  describe('Method', () => {
    describe('print', () => {
      it('Should be able to print message', () => {
        let consoleMock: ConsoleMock = <ConsoleMock> createStubInstance(console.constructor)
        let readlineMock: ReadlineMock = <ReadlineMock> createStubInstance(readline['Interface'])
        let sut = new ConsoleUI(<any> consoleMock, <any> readlineMock)

        sut.print('this is my test output')

        expect(consoleMock.log).to.be.calledWith('this is my test output')
      })
    })

    describe('registerInputHandler', () => {
      it('Should register callback function', () => {
        let consoleMock: ConsoleMock = <ConsoleMock> createStubInstance(console.constructor)
        let readlineMock: ReadlineMock = <ReadlineMock> createStubInstance(readline['Interface'])
        let callback: any = spy()

        let sut = new ConsoleUI(<any> consoleMock, <any> readlineMock)

        sut.registerInputHandler(callback)

        expect(readlineMock.on).to.be.calledWith('line', callback)
      })
    })
  })
})
