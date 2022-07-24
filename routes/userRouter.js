const router = require('express').Router()
const userCtrl = require('../controllers/userCtrl')
const auth = require('../middleware/auth')


//Registration for user
router.post('/register', userCtrl.registerUser)

//Login for user
router.post('/login', userCtrl.loginUser)

//verify Token
router.get('/verify', userCtrl.verifiedToken)


module.exports = router 