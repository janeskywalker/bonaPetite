const express = require('express')

const router = express.Router()

const ctrls = require('../controllers')

// get
router.get('/signup', ctrls.signUpCtrl.newUser)
router.get('/login', ctrls.accountCtrl.newSession);
router.get('/logout', ctrls.accountCtrl.deleteSession);

// post
router.post('/signup', ctrls.signUpCtrl.createUser);
// when log in succeed, start session
router.post('/login', ctrls.accountCtrl.createSession);



module.exports = router
