const multer = require("multer");
const upload = multer({ dest: 'uploads/' })
const UserController = require("../controllers/UserController");

const router = require('express').Router()

router.get('/upload', ((req, res) => {
  res.render('upload', { title: '上传页面' })
}))

router.post('/api/upload', upload.single("avatar"), UserController.uploadUserAvatar)
// router.post('/api/upload', upload.array("avatar", 12), UserController.uploadUserAvatar) 多张图片上传 12表示最大值

module.exports = router
