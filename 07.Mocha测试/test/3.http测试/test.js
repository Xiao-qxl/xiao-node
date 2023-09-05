const axios = require('axios')
const assert = require('assert')

const supertest = require('supertest')
const app = require('./app')

describe('接口测试', () => {
  it('返回html代码片段测试', async () => {
    const res = await axios.get('http://localhost:3000')
    assert.strictEqual(res.data, `<h1>hello</h1>`)
  });
})

describe('supertest测试接口', () => {
  const server = app.listen('3000')
  it('返回html代码片段测试2', async () => {
    await supertest(server)
      .get('/')
      .expect("Content-Type", /text\/html/)
      .expect(200, `<h1>hello</h1>`)

    after(() => {
      server.close()
    })
  });
})
