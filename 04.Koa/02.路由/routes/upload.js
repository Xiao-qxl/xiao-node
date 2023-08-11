const Router = require('koa-router')
const multer = require("@koa/multer");
const path = require("path");

const router = new Router()
// 使用koa-multer中间件后，FormData编码数据。
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed.'));
    }
  }
});

router.get('/', upload.single('file'), (ctx, next) => {
  console.log(ctx.request.body)
  console.log(ctx.file)
  const filePath = path.resolve(ctx.file.path).replace(/\\/g, "/")
  ctx.body = {
    ok: 1,
    msg: '上传成功',
    filePath
  }
})
module.exports = router
