const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

app.use(express.json());
app.use(cookieParser());

// route imports
const productRoute = require('./Routes/productRoute');
const userRoute = require('./Routes/userRoute');
const orderRoute = require('./Routes/orderRoute');

// middleware imports
app.use('/api/v1', productRoute);
app.use('/api/v1', userRoute);
app.use('/api/v1', orderRoute);







module.exports = app;