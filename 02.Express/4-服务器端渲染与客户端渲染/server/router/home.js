const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  /* 渲染模板 */
  const list = ['aaa', 'bb', 'ccc']
  const myHtml = '<b>我是加粗的</b>'
  res.render("home", { list, myHtml }) // 找view文件夹下的home.ejs
})

module.exports = router
