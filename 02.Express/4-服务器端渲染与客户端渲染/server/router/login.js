const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  /* 渲染模板 */
  res.render("login", { title: '后台的数据', isShow: false }) // 找view文件夹下的login.ejs
})

router.get('/list', (req, res) => {
  res.send(['111', '222', '333'])
})

router.post('/', (req, res) => {
  if (req.body.username === 'aaa' && req.body.password === '111') {
    console.log('登录成功')
    res.redirect('/home')
  } else {
    console.log('登录失败')
    res.render('login', { title: '用户名或密码错误', isShow: true });
  }
})

module.exports = router
