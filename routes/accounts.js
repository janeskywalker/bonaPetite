const express = require('express')

const router = express.Router()

const ctrls = require('../controllers')

// create new users
router.get('/signup', ctrls.accountCtrl.newUser)
router.post('/signup', ctrls.accountCtrl.createUser);

// user log in
router.get('/login', ctrls.accountCtrl.newSession);
router.post('/login', ctrls.accountCtrl.createSession);

router.get('/logout', ctrls.accountCtrl.deleteSession);




module.exports = router
