const chai = require('chai')
const sum = require('../sum')

chai.should()

describe("chai测试", () => [
  describe("chai.assert测试", () => {
    it ("sum() 结果应该返回0", () => {
      chai.assert.equal(sum(), 0)
    })
    it ("sum(1) 结果应该返回1", () => {
      chai.assert.equal(sum(1), 1)
    })
  }),
  describe("chai.should测试", () => {
    it ("sum(1, 2) 结果应该返回3", () => {
      sum(1, 2).should.exist.and.equal(3).and.have.lt(5).and.be.a('number')
    })
  }),
  describe("chai.expect测试", () => {
    it ("sum(1, 2) 结果应该返回3", () => {
      const result = sum(1, 2)
      chai.expect(result).to.equal(3)
      chai.expect(result).to.within(2, 6)
    })
  })
])
