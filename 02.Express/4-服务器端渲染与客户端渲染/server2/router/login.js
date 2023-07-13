const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  /* 渲染模板 */
  res.render("login", { title: '后台的数据', isShow: false }) // 找view文件夹下的login.html
})

module.exports = router
