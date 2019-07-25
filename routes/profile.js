const express = require('express');
const router = express.Router();
const ctrls = require('../controllers');

// Get routes
router.get('/', ctrls.profileCtrl.profile);
router.get('/newplan', ctrls.profileCtrl.newPlan);
router.get('/search', ctrls.profileCtrl.newSearch);
router.get('/getItems',ctrls.profileCtrl.getItems);
// Post routes
router.post('/newplan', ctrls.profileCtrl.addNewPlan);
router.post('/updateProfile', ctrls.profileCtrl.updateCalories);
// Delete route
router.delete('/:id', ctrls.profileCtrl.deleteItem);

module.exports = router;
