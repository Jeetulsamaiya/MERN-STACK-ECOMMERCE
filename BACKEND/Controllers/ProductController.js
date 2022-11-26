const Product = require('../models/productmodel');
const ErrorHandler = require('../utils/errorhandler');
const ApiFeatures = require('../utils/apifeatures');


// create products -- ADMIN ONLY
exports.createProduct = async (req, res, next) => {
    try {
        req.body.user = req.user.id
        const product = await Product.create(req.body);
        res.status(201).json({
            success: true,
            product,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message,
        });
    }
};
// Update products -- ADMIN ONLY
exports.updateProduct = async (req, res, next) => {
    try {
        let product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({
                success: false,
                error: 'Product not found',
            });
        }
        product = await Product.findByIdAndUpdate(req.params.id,
            req.body,{
                new:true,
                runValidators:true,
                useFindAndModify:false
            });
        res.status(200).json({
            success: true,
            product,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message,
        });
    }
};

// Delete products -- ADMIN ONLY
exports.deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({
                success: false,
                error: 'Product not found',
            });
        }
        await product.remove();
        res.status(200).json({
            success: true,
            message: 'Product deleted',
        });
       
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message,
        });
    }
};


// get product details
exports.getProductDetails = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({
                success: false,
                error: 'Product not found',
            });
        }

    
        res.status(200).json({
            success: true,
            product,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message,
        });
    }
};



// get all products
exports.getAllProducts = async (req, res, next) => {
    try {
        const resPerPage = 5;
        const productCount = await Product.countDocuments();
        const apifeature = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resPerPage);
        const products = await apifeature.query;
        res.status(200).json({
            success: true,
            products,
            productCount,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message,
        });
    }
};
