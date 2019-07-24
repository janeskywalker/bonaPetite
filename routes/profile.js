const express = require('express');
const router = express.Router();
const ctrls = require('../controllers');


router.get('/new', ctrls.profileCtrl.newPlan);
router.get('/', ctrls.profileCtrl.profile);


module.exports = router;
