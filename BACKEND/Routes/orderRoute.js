const express = require('express');
const router = express.Router();


//  Controllers imports
const {
     newOrder,
     getSingleOrder,
     myOrders,
     allOrders,
     deleteOrder,
     updateOrder
 } = require('../Controllers/OrderController');


// milldware imports
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

// Routes

// new order => /api/v1/order/new
router.route('/order/new').post(isAuthenticatedUser, newOrder);

// get single order => /api/v1/order/:id
router.route('/order/:id').get(isAuthenticatedUser, getSingleOrder);

// get logged in user orders => /api/v1/orders/me
router.route('/orders/me').get(isAuthenticatedUser, myOrders);



// admin routes

// get all orders - ADMIN => /api/v1/admin/orders
router.route('/admin/orders').get(isAuthenticatedUser, authorizeRoles('admin'), allOrders);

// update / process order / delete order - ADMIN => /api/v1/admin/order/:id
router.route('/admin/order/:id')
.put(isAuthenticatedUser, authorizeRoles('admin'), updateOrder)
.delete(isAuthenticatedUser, authorizeRoles('admin'), deleteOrder);




module.exports = router;
