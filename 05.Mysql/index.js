const express = require("express")
const app = express()
const mysql2 = require("mysql2")

app.get("/", async (req, res) => {
  // 创建连接池
  const config = getDBConfig()
  const promisePool = mysql2.createPool(config).promise()
  const username = "admin"
  const status = '0'
  // 拼接字符串的时候  引号不可以省略
  /* 方法一
  const users = await promisePool.query(`
    select * from users
        where username="${username}"
        order by id desc limit 5 offset 0
  `)
  */
  // 方法二（推荐）
  const users = await promisePool.query(`
    select * from users 
        where username=? and status=?
        order by id desc limit 5 offset 0
  `, [username, status])
  res.send({
    ok: 1,
    data: users[0]
  })
})

app.listen(3000, () => {
  console.log('server start at http://localhost:3000')
})

function getDBConfig() {
  return {
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '123456',
    database: 'my_db',
    connectionLimit: 1
  }
}
