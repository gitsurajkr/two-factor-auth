const express = require('express');
const { signup, signin, signout } = require('../controller/auth.controller')
const { sendOTP, verifyOTP } = require('../controller/OTP.controller')

const router = express.Router();


router.post('/signup', signup)
router.post('/sendotp', sendOTP)
router.post('/verifyotp', verifyOTP)
router.post('/signin', signin)
router.post('/signout', signout)



module.exports = router