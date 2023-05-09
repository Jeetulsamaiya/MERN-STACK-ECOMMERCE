const express = require('express')
const router = express.Router()
const {
    registerUser, 
    loginUser,
    logout,
    forgotPassword,
    resetPassword,
    getUserDetail,
    updatePassword,
    updateProfile,
    allUsers,
    getUser,
    updateUser,
    deleteUser
} = require('../Controllers/UserController')
const { isAuthenticatedUser ,authorizeRoles} = require('../middleware/auth')




// Register a user => /api/v1/register
router.route('/register').post(registerUser)

// Login user => /api/v1/login
router.route('/login').post(loginUser)

// Logout user => /api/v1/logout
router.route('/logout').get(logout)

// Forgot password => /api/v1/password/forgot
router.route('/password/forgot').post(forgotPassword)

// Reset password => /api/v1/password/reset/:token
router.route('/password/reset/:token').put(resetPassword)

// Get user profile => /api/v1/me
router.route('/me').get(isAuthenticatedUser, getUserDetail)

// Update password => /api/v1/password/update
router.route('/password/update').put(isAuthenticatedUser, updatePassword)

// Update user profile => /api/v1/me/update
router.route('/me/update').put(isAuthenticatedUser, updateProfile)

// Get all users => /api/v1/admin/users
router.route('/admin/users').get(isAuthenticatedUser,authorizeRoles('admin'), allUsers)

// Get user details => /api/v1/admin/user/:id
router.route('/admin/user/:id').get(isAuthenticatedUser,authorizeRoles('admin'), getUser)

// Update user => /api/v1/admin/user/:id
router.route('/admin/user/:id').put(isAuthenticatedUser,authorizeRoles('admin'), updateUser)

// Delete user => /api/v1/admin/user/:id
router.route('/admin/user/:id').delete(isAuthenticatedUser,authorizeRoles('admin'), deleteUser)


module.exports = router