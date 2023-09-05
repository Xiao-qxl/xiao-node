const assert = require('assert')
const sum = require('../sum')

assert.strictEqual(sum(), 0)
assert.strictEqual(sum(1), 1)
assert.strictEqual(sum(1, 2), 3)
assert.strictEqual(sum(1, 2, 3), 6)

describe("assert测试", () => [
  describe("小的组测试1", () => {
    it ("sum() 结果应该返回0", () => {
      assert.strictEqual(sum(), 0)
    })
  }),
  describe("小的组测试2", () => {
    it ("sum(1, 2, 3) 结果应该返回12", () => {
      assert.strictEqual(sum(1, 2, 3), 6)
    })
  })
])
