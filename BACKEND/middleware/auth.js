const jwt = require('jsonwebtoken');
const User = require('../models/usersmodel');

exports.isAuthenticatedUser = async (req, res, next) => {
   try {
    const {token} = req.cookies;
    if (!token) {
        return res.status(401).json({
            success: false,
            error: 'Please login to access this resource',
        });
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);
   } catch (error) {
    return res.status(401).json({
        success: false,
        error: 'Please login to access this resource',
    });

    }
    next();
};

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)) {
            return  res.status(403).json({
                success: false,
                error: `Role (${req.user.role}) is not allowed to access this resource`,
            });
        }
        next();
    };

}


