const express = require('express');
const router = express.Router();
const ctrls = require('../controllers');

router.get('/', ctrls.profileCtrl.profile);
router.get('/newplan', ctrls.profileCtrl.newPlan);
router.post('/newplan', ctrls.profileCtrl.addNewPlan);
router.post('/updateProfile', ctrls.profileCtrl.updateCalories);
router.get('/search', ctrls.profileCtrl.newSearch);
router.get('/getItems',ctrls.profileCtrl.getItems);
router.delete('/:id', ctrls.profileCtrl.deleteItem);

module.exports = router;
