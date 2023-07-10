const express = require('express')

const router = express.Router()
/* 路由级别中间件 */
router.use((res, req, next) => {
  console.log('路由中间件：UserRouter')
  next()
})

router.get('/', (req, res) => {
  res.send('user路由')
})

router.get('/name', (req, res) => {
  res.send('user中的name')
})

router.get('/age', (req, res) => {
  res.send('user中的age')
})

module.exports = router
