const fs = require('fs')
/*
* 以下函数均是异步调用，若同步调用使用**Sync，并使用try...catch捕获异常
* */
/* mkdir 创建目录 */
fs.mkdir('./目录', (err) => {
  err ? errCodeMsg(err) : console.log('创建目录完成')
})

/* rename 重命名 */
fs.rename("./目录", "./重命名的目录", (err) => {
  err ? errCodeMsg(err) : console.log('重命名成功')
})

/* rmdir 删除目录 */
fs.rmdir("./重命名的目录", (err) => {
  err ? errCodeMsg(err) : console.log('删除重命名的目录成功')
})

/* writeFile 创建文件，覆盖写入 */
fs.writeFile("./目录/text.txt", '文件写入的内容', (err) => {
  err ? errCodeMsg(err) : console.log('创建文件成功')
})

/* appendFile 添加内容写入 */
fs.appendFile("./目录/text.txt", '\n添加写入的内容', (err) => {
  err ? errCodeMsg(err) : console.log('添加文件内容成功')
})

/* readFile 读取文件内容 */
fs.readFile("./目录/text.txt", "utf-8", (err, data) => {
  err ? errCodeMsg(err) : console.log('读文件内容成功', data.toString())
})

/* unlink 删除文件 */
fs.unlink("./目录/text.txt", (err) => {
  err ? errCodeMsg(err) : console.log('删除文件成功')
})

/* readdir 读目录 */
fs.readdir("./重命名的目录", (err, data) => {
  err ? errCodeMsg(err) : console.log('读取目录成功', data)
})

/* stat 读取目录详情 */
fs.stat("./重命名的目录", (err, data) => {
  err ? errCodeMsg(err) : (
    console.log('读取目录详情成功', data),
    console.log(data.isFile(), data.isDirectory())
  )
})
function errCodeMsg(err) {
  console.log(err)
  if (err.code === 'EEXIST') console.log('目录已存在')
  if (err.code === 'ENOENT') console.log('目录不存在')
  if (err.code === 'ENOTEMPTY') console.log('目录下不为空')
}
