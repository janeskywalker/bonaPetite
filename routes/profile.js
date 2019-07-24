const express = require('express');
const router = express.Router();
const ctrls = require('../controllers');

router.get('/', ctrls.profileCtrl.profile);
router.get('/newplan', ctrls.profileCtrl.newPlan);

module.exports = router;
