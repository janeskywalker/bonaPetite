const express = require('express');
const router = express.Router();
const ctrls = require('../controllers');

// create new users
router.get('/signup', ctrls.accountCtrl.newUser);
router.post('/signup', ctrls.accountCtrl.createUser);
//log in/logout
router.get('/login', ctrls.accountCtrl.newSession);
router.get('/logout', ctrls.accountCtrl.deleteSession);
router.post('/login', ctrls.accountCtrl.createSession);

module.exports = router
