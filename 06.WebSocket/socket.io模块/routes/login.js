const express = require('express')
const LoginController = require("../controllers/LoginController");

const router = express.Router()

router.post("/", LoginController.postLogin)

module.exports = router
