const fs = require("fs")

/* 同步调用 */
try {
  fs.mkdirSync('./同步目录')
} catch (error) {
  console.log(error)
}
/* 异步调用 */
fs.mkdir('./异步目录', (err) => {
  if (!err) {
    console.log('创建成功')
  } else {
    console.log(err)
  }
})

/* promise异步调用 */
fs.promises.mkdir("./异步目录")
  .then(() => {
    console.log('创建成功')
  })
  .catch(err => {
    console.log(err)
  })

/* async await异步调用 */
fs.promises.readdir('./目录')
  .then(async (data) => {
    console.log(data)
    await Promise.all([
      data.map(item => fs.promises.unlink(`./目录/${item}`))
    ])
    await fs.promises.rmdir('./目录')
  })
