const express = require('express')
const router = express.Router()
const {
    registerUser, loginUser,logout, forgotPassword
} = require('../controllers/UserController')


// Register a user => /api/v1/register
router.route('/register').post(registerUser)

// Login user => /api/v1/login
router.route('/login').post(loginUser)

// Logout user => /api/v1/logout
router.route('/logout').get(logout)

// Forgot password => /api/v1/password/forgot
router.route('/password/forgot').post(forgotPassword)


module.exports = router