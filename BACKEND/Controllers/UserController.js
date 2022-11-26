const User = require('../models/usersmodel');
// const ErrorHandler = require('../utils/errorhandler');
// const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const sendToken = require('../utils/sendToken');
const sendEmail = require('../utils/sendEmail.js');

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
        res.status(400).json({
            success: false,
            error: error.message,
        });
    }
    };

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


