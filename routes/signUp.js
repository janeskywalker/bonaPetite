const express = require('express')

const router = express.Router()

const ctrls = require('../controllers')

router.get('/signup', ctrls.signUpCtrl.newUser)

module.exports = router
