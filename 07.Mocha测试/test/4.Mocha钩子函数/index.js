const assert = require('assert')

describe('钩子函数测试', () => {
  it('测试1', function () {
    console.log('测试1')
  });

  it('测试2', function () {
    console.log('测试2')
  });

  before(() => {
    console.log('before钩子')
  })
  after(() => {
    console.log('after钩子')
  })
  beforeEach(() => {
    console.log('beforeEach钩子')
  })
  afterEach(() => {
    console.log('afterEach钩子')
  })
})
