const path = require("path");
const fs = require('fs')
const fsp = fs.promises
const assert = require('assert')

const filePath = path.resolve(__dirname, '../../file/1.txt')

describe('异步测试', () => [
  it('fs异步读取文件', (done) => {
    fs.readFile(filePath, 'utf8', (err, data)=>{
      if (err) {
        done(err)
      }else {
        assert.strictEqual(getFirstLine(data), "hello")
        done()
      }
    })
  }),
  it('fsp异步读取文件', async () => {
    const data = await fsp.readFile(filePath, 'utf8')
    assert.strictEqual(getFirstLine(data), "hello")
  }),
])

function getFirstLine(data) {
  return data.split('\r\n')[0]
}
