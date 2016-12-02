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
  let promise: Promise<string>
  const question: string = 'What day is it?'
  const answer: string = 'Sunday'

  beforeEach(() => {
    consoleMock = <ConsoleMock> createStubInstance(console.constructor)
    readlineMock = <ReadlineMock> createStubInstance(readline[ 'Interface' ])
    sut = new ConsoleUI(<any> consoleMock, <any> readlineMock)
  })

  describe('Method', () => {
    describe('registerInputHandler', () => {
      it('Should register callback function', () => {
        let callback: any = spy()

        sut.registerInputHandler(callback)

        expect(readlineMock.on).to.be.calledWith('line', callback)
      })
    })

    describe('prompt', () => {
      it('Should show prompt', () => {
        sut.prompt()

        expect(readlineMock.prompt).to.be.called
      })
    })

    describe('print', () => {
      it('Should be able to print message', () => {
        sut.print('this is my test output')

        expect(consoleMock.log).to.be.calledWith('this is my test output')
      })
    })

    describe('askQuestion', () => {
      it('Should print question', () => {
        sut.askQuestion(question)

        expect(readlineMock.question).to.be.calledWith(question)
      })

      it('Should resolve returned promise when input is added', () => {
        promise = sut.askQuestion(question)

        readlineMock.question.callArgWith(1, answer)

        return promise.then((result) => expect(result).to.equal(answer))
      })

      it('Should ask for input again if value doesnt match validation', () => {
        sut.askQuestion(question, () => false)

        readlineMock.question.callArgWith(1, answer)

        expect(readlineMock.question).to.always.be.calledWith(question)
        expect(readlineMock.question).to.be.calledTwice
      })

      it('Should get second input when answer first was wrong', () => {
        const falseAnswer: string = 'Monkeyday'
        promise = sut.askQuestion(question, (a) => a === answer)

        readlineMock.question.firstCall.callArgWith(1, falseAnswer)
        readlineMock.question.secondCall.callArgWith(1, answer)

        return promise.then((result) => expect(result).to.equal(answer))
      })
    })

  })
})
