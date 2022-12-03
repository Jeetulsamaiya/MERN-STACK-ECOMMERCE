const Order = require('../models/ordermodel');
const Product = require('../models/productmodel');



// Create new order => /api/v1/order/new
exports.newOrder = async (req, res, next) => {
    try {
        const{
            shippingInfo,
            orderItems,
            paymentInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        } = req.body;
        const order = await Order.create({
            shippingInfo,
            orderItems,
            paymentInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            paidAt: Date.now(),
            user: req.user._id
        });
        res.status(200).json({
            success: true,
            order
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message,
        });
    }    
    }


// Get single order => /api/v1/order/:id
exports.getSingleOrder = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id).populate('user', 'name email');
        if (!order) {
            return res.status(404).json({
                success: false,
                error: `Order not found with id ${req.params.id}`,
            });
        }
        res.status(200).json({
            success: true,
            order,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message,
        });
    }
    }


// Get logged in user orders => /api/v1/orders/me
exports.myOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({user: req.user.id});
        res.status(200).json({
            success: true,
            orders,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message,
        });
    }
    }

    // Get all orders - ADMIN => /api/v1/admin/orders
exports.allOrders = async (req, res, next) => {
    try {
        const orders = await Order.find();
        let totalAmount = 0;
        orders.forEach(order => {
            totalAmount += order.totalPrice;
        });
        res.status(200).json({
            success: true,
            totalAmount,
            orders,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message,
        });
    }
    }


    // Update Order Status - ADMIN => /api/v1/admin/order/:id
exports.updateOrder = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({
                success: false,
                error: `Order not found with id ${req.params.id}`,
            });
        }
        if (order.orderStatus === 'Delivered') {
            return res.status(400).json({
                success: false,
                error: 'You have already delivered this order',
            });
        }
        order.orderItems.forEach(async item => {
            await updateStock(item.product, item.quantity);
        });
        order.orderStatus = req.body.status;
        if(req.body.status === 'Delivered') {
            order.deliveredAt = Date.now();
        }
        await order.save({ validateBeforeSave: false});
        res.status(200).json({
            success: true,
            order,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message,
        });
    }
    }
    async function updateStock(id, quantity) {
        const product = await Product.findById(id);
        product.stock -= quantity;
        await product.save({ validateBeforeSave: false});
    }


    // Delete Order - ADMIN => /api/v1/admin/order/:id
exports.deleteOrder = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({
                success: false,
                error: `Order not found with id ${req.params.id}`,
            });
        }
        await order.remove();
        res.status(200).json({
            success: true,
            message: 'Order is deleted',
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message,
        });
    }
    }




