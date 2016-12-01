import { ConsoleUI } from './ConsoleUI'
import { expect, use } from 'chai'
import * as readline from 'readline'
import { createStubInstance, spy } from 'sinon'
import * as SinonChai from 'sinon-chai'

describe('Class ConsoleUI', () => {
  use(SinonChai)
  let consoleMock: ConsoleMock
  let readlineMock: ReadlineMock
  let sut: ConsoleUI

  beforeEach(() => {
    consoleMock = <ConsoleMock> createStubInstance(console.constructor)
    readlineMock = <ReadlineMock> createStubInstance(readline[ 'Interface' ])
    sut = new ConsoleUI(<any> consoleMock, <any> readlineMock)
  })

  describe('Method', () => {
    describe('print', () => {
      it('Should be able to print message', () => {
        sut.print('this is my test output')

        expect(consoleMock.log).to.be.calledWith('this is my test output')
      })
    })

    describe('registerInputHandler', () => {
      it('Should register callback function', () => {
        let callback: any = spy()

        sut.registerInputHandler(callback)

        expect(readlineMock.on).to.be.calledWith('line', callback)
      })
    })

    describe('askQuestion', () => {
      it('Should print question', () => {
        const question = 'What day is it?'
        sut.askQuestion(question)

        expect(readlineMock.question).to.be.calledWith(question)
      })


      it('Should resolve returned promise when input is added', (done) => {
        let input = 'my input'
        let promise: Promise<string> = sut.askQuestion('')

        readlineMock.question.callArgWith(1, input)

        promise.then((result) => {
          expect(result).to.equal(input)
          done()
        }).catch((error) => done(`promise was rejected: ${error}`))
      })
    })
  })
})
