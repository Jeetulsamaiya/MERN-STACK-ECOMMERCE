const express = require('express');
const router = express.Router();

//  Controllers imports
const {getAllProducts,
     createProduct,
     updateProduct,
     deleteProduct,
     getProductDetails,
     createProductReview,
     deleteReview,
     getProductReviews
    } = require('../Controllers/ProductController');

//  Middleware imports
const { isAuthenticatedUser,authorizeRoles } = require('../middleware/auth');   

// routes

// get all products
router.route('/products').get(getAllProducts);

// get product details
router.route('/product/:id').get(getProductDetails);

// create product review => /api/v1/review
router.route('/review').put(isAuthenticatedUser,createProductReview);


// get product reviews and delete => /api/v1/reviews
router.route('/reviews').get(getProductReviews).delete(isAuthenticatedUser,deleteReview);





// admin routes

// create new product => /api/v1/admin/product/new
router.route('/admin/product/new').post(isAuthenticatedUser,authorizeRoles('admin'),createProduct);

// update product and delete => /api/v1/admin/product/:id
router.route('/admin/product/:id').put(isAuthenticatedUser,authorizeRoles('admin'),updateProduct).delete(isAuthenticatedUser,authorizeRoles('admin'),deleteProduct);









module.exports = router;