const express = require('express');
const router = express.Router();

//  Controllers imports
const {getAllProducts,
     createProduct,
     updateProduct,
     deleteProduct,
     getProductDetails,
     createProductReview,
    } = require('../Controllers/ProductController');

//  Middleware imports
const { isAuthenticatedUser,authorizeRoles } = require('../Middleware/auth');   

// routes
router.route('/products').get(getAllProducts);
router.route('/product/:id').get(getProductDetails);

// create product review => /api/v1/review
router.route('/review').put(isAuthenticatedUser,createProductReview);



// admin routes
router.route('/admin/product/new').post(isAuthenticatedUser,authorizeRoles('admin'),createProduct);
router.route('/admin/product/:id').put(isAuthenticatedUser,authorizeRoles('admin'),updateProduct).delete(isAuthenticatedUser,authorizeRoles('admin'),deleteProduct);









module.exports = router;