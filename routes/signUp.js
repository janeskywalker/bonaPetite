const express = require('express')

const router = express.Router()

const ctrls = require('../controllers')

router.get('/signup', ctrls.signUpCtrl.newUser)

router.get('/login', ctrls.signUpCtrl.newSession);

//router.get('/accounts/login',ctrls.signUpCtrl.newSession);

router.post('/signup', ctrls.signUpCtrl.createUser);



module.exports = router
