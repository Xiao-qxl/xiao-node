const router = require('express').Router()
const LogoutController = require("../controllers/LogoutController");

router.get('/', LogoutController.logout)

module.exports = router
