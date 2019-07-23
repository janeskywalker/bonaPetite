const express = require('express')

const router = express.Router()

const ctrls = require('../controllers')

// get
router.get('/signup', ctrls.signUpCtrl.newUser)


// post
router.post('/signup', ctrls.signUpCtrl.createUser);




module.exports = router
