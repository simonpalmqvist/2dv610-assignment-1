import { ConsoleUI } from './ConsoleUI'
import { expect, use } from 'chai'
import { createStubInstance } from 'sinon'
import * as SinonChai from 'sinon-chai'

describe('Class ConsoleUI', () => {
  use(SinonChai)

  describe('Method', () => {
    describe('print', () => {
      it('Should be able to print message', () => {
        let consoleMock: ConsoleMock = <ConsoleMock> createStubInstance(console.constructor)
        let sut = new ConsoleUI(<any> consoleMock)

        sut.print('this is my test output')

        expect(consoleMock.log).to.be.calledWith('this is my test output')
      })
    })
  })
})
