import Example from './Example'
import { expect } from 'chai'

describe('Example', () => {

  it('should initialize example', () => {
    let example: Example = new Example(3)

    expect(example.number).to.equal(3)
  })

  it('should be able to multiply', () => {
    let example: Example = new Example(3)

    example.double()

    expect(example.number).to.equal(6)
  })
})
