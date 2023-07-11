const express = require('express')
const router = express.Router()

router.get('/list', (req, res) => {
  res.send(['111', '222', '333'])
})

module.exports = router
