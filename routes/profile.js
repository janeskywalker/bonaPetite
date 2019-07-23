const express = require('express');
const router = express.Router();
const ctrls = require('../controllers');

router.get('/login', ctrls.accountCtrl.newSession);
router.get('/logout', ctrls.accountCtrl.deleteSession);

router.get('/', ctrls.profileCtrl.profile);
// when log in succeed, start session
router.post('/login', ctrls.accountCtrl.createSession);

module.exports = router;
