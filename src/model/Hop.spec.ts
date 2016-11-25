import Validate from '../validation/Validate'
import Hop from './Hop'
import { expect } from 'chai'
import { stub } from 'sinon'

describe('Class Hop', function () {
  let sut: Hop
  let validatePercentStub: Sinon.SinonStub
  let validateNotNegativeStub: Sinon.SinonStub
  const alpha: number = 0.14
  const newAlpha: number = 0.03
  const amount: number = 10
  const newAmount: number = 30
  const name: string = 'My Hop'
  const newName: string = 'Simcoe'
  const time: number = 60
  const newTime: number = 120

  beforeEach(function () {
    sut = new Hop(alpha, amount, name, time)
    validatePercentStub = stub(Validate, 'percent')
    validateNotNegativeStub = stub(Validate, 'notNegative')
  })

  afterEach(function () {
    validatePercentStub.restore()
    validateNotNegativeStub.restore()
  })

  describe ('Property', function () {
    describe ('Alpha', function () {
      it('Should be able to get value', function () {
        expect(sut.alpha).to.equal(alpha)
      })

      it('Should be able to set value', function () {
        sut.alpha = newAlpha
        expect(sut.alpha).to.equal(newAlpha)
      })

      it('Should be validated as percent', function () {
        sut.alpha = newAlpha

        expect(validatePercentStub.calledOnce).to.be.true
        expect(validatePercentStub.args[0][0]).to.equal(newAlpha)
      })
    })

    describe ('Amount', function () {
      it('Should be able to get value', function () {
        expect(sut.amount).to.equal(amount)
      })

      it('Should be able to set value', function () {
        sut.amount = newAmount
        expect(sut.amount).to.equal(newAmount)
      })

      it('Should be validated as not negative', function () {
        sut.amount = newAmount

        expect(validateNotNegativeStub.calledOnce).to.be.true
        expect(validateNotNegativeStub.args[0][0]).to.equal(newAmount)
      })
    })

    describe ('Name', function () {
      it('Should be able to get value', function () {
        expect(sut.name).to.equal(name)
      })

      it('Should be able to set value', function () {
        sut.name = newName
        expect(sut.name).to.equal(newName)
      })
    })

    describe ('Time', function () {
      it('Should be able to get value', function () {
        expect(sut.time).to.equal(time)
      })

      it('Should be able to set value', function () {
        sut.time = newTime
        expect(sut.time).to.equal(newTime)
      })

      it('Should be validated as not negative', function () {
        sut.time = newTime

        expect(validateNotNegativeStub.calledOnce).to.be.true
        expect(validateNotNegativeStub.args[0][0]).to.equal(newTime)
      })
    })
  })

  describe('Method', function () {
    describe('calculateIBU', function () {
      it('Should be able to calculate IBU with +/- 0.1', function () {
        sut = new Hop(0.14, 10, name, 60)
        const gravity: number = 1.050
        const wortVolume: number = 10

        const expected: number = sut.calculateIBU(gravity, wortVolume)

        expect(expected).to.be.approximately(32.3, 0.1)
      })
    })
  })
})
