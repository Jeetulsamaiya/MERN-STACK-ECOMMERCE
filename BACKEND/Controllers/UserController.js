const User = require('../models/usersmodel');
// const ErrorHandler = require('../utils/errorhandler');
// const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const sendToken = require('../utils/sendToken');
const sendEmail = require('../utils/sendEmail.js');
const crypto = require('crypto');

// Register a user
exports.registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.create({
            name,
            email,
            password,
            avatar: {
                public_id: 'sample',
                url: 'sampleURL',
            },
        });
        sendToken(user, 201, res);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'User already exists with this email address',
            });
            
    }
    }};

// Login user
exports.loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        // Checks if email and password is entered by user
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                error: 'Please enter email and password',
            });
        }
        // Finding user in database
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'Invalid email or password',
            });
        }
        // Checks if password is correct or not
        const isPasswordMatched = await user.comparePassword(password);
        if (!isPasswordMatched) {
            return res.status(404).json({
                success: false,
                error: 'Invalid email or password',
            });
        }
        sendToken(user, 200, res);
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message,
        });
    }
    };

    // Logout user
exports.logout = async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });
    res.status(200).json({
        success: true,
        message: 'Logged out',
    });
    };
    

// Forgot password
exports.forgotPassword = async (req, res, next) => {
    try {
        const user = await User.findOne({
            email: req.body.email,
        });
        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found with this email',
            });
        }
        // Get reset token
        const resetToken = user.getResetPasswordToken();
        await user.save({
            validateBeforeSave: false,
        });
        // Create reset password url
        const resetPasswordUrl = `${req.protocol}://${req.get(
            'host'
        )}/api/v1/password/reset/${resetToken}`;
        const message = `Your password reset token is as follow:\n\n${resetPasswordUrl}\n\nIf you have not requested this email, then ignore it.`;
        try {
            await sendEmail({
                email: user.email,
                subject: 'Ecommerce Password Recovery',
                message,
            });
            res.status(200).json({
                success: true,
                message: `Email sent to: ${user.email} successfully`,
            });
        }
        catch (error) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save({
                validateBeforeSave: false,
            });
            return res.status(500).json({
                success: false,
                error: error.message,
            });
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message,
        });
    }
    };


// Reset password
exports.resetPassword = async (req, res, next) => {
    try {
        // Hash url token
        const resetPasswordToken = crypto
            .createHash('sha256')
            .update(req.params.token)
            .digest('hex');
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: {
                $gt: Date.now(),
            },
        });
        if (!user) {
            return res.status(400).json({
                success: false,
                error: 'Password reset token is invalid or has been expired',
            });
        }
        if (req.body.password !== req.body.confirmPassword) {
            return res.status(400).json({
                success: false,
                error: 'Password does not match',
            });
        }
        // Setup new password
        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();
        sendToken(user, 200, res);
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message,
        });
    }
    };


// get user detail after user login
exports.getUserDetail = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message,
        });
    }
    };

// Update user password
exports.updatePassword = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).select('+password');
        // Check previous user password
        const isMatched = await user.comparePassword(req.body.oldPassword);
        if (!isMatched) {
            return res.status(400).json({
                success: false,
                error: 'Old password is incorrect',
            });
        }
        if (req.body.newPassword !== req.body.confirmPassword) {
            return res.status(400).json({
                success: false,
                error: 'Password does not match',
            });
        }
        user.password = req.body.newPassword;
        await user.save();
        sendToken(user, 200, res);
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message,
        });
    }
    };

// Update user profile
exports.updateProfile = async (req, res, next) => {
    try {
        const newUserData = {
            name: req.body.name,
            email: req.body.email,
        };
        // update avatar: Later
        const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });
        res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message,
        });
    }
    };


// Get all users ---------------------------- (admin)
exports.allUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json({
            success: true,
            users,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message,
        });
    }
    };

    // Get single user ------------------------ (admin)
exports.getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                error: `User not found with id ${req.params.id}`,
            });
        }
        res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message,
        });
    }
    };


    // Update user role ------------------------ (admin)
exports.updateUser = async (req, res, next) => {
    try {
        const newUserData = {
            name: req.body.name,
            email: req.body.email,
            role: req.body.role,
        };
        const user = await User.findByIdAndUpdate(req.params.id
            , newUserData, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });
        res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message,
        });
    }
    };

    // Delete user ------------------------ (admin)
exports.deleteUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        // Remove avatar from cloudinary
        if (!user) {
            return res.status(404).json({
                success: false,
                error: `User not found with id ${req.params.id}`,
            });
        }
        await user.remove();
        res.status(200).json({
            success: true,
            message: 'User deleted successfully',
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message,
        });
    }
    };

