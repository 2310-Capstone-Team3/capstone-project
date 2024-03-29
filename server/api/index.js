const express = require('express');
const app = express.Router();
const { isLoggedIn, isAdmin, isVIP } = require('./middleware');

app.use('/products', require('./products'));
app.use('/', require('./auth'));
app.use('/orders', require('./orders'));
app.use('/lineItems', require('./lineItems'));
app.use('/users', require('./users'));
module.exports = app;
