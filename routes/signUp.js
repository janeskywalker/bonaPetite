const express = require('express')

const router = express.Router()

const ctrls = require('../controllers')

router.get('/signup', ctrls.signUpCtrl.newUser)
router.post('/signup', ctrls.signUpCtrl.createUser);

module.exports = router
