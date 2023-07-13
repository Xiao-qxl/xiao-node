var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  // cookie读取
  console.log(req.cookies)
  // cookie设置
  res.cookie("gender", 'male')
  res.send('respond with a resource');
});

module.exports = router;
