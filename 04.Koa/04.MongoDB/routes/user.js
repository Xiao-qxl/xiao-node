const router = new (require('koa-router'))
const UserControl = require('../controllers/UserController')

router.prefix('/api/user')
router.get('/', UserControl.getUser)

module.exports = router
