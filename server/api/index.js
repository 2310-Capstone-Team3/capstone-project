const express = require('express');
const app = express.Router();
const { isLoggedIn, isAdmin, isVIP } = require('./middleware');

app.use('/products', require('./products'));
app.use('/', require('./auth'));
app.use('/orders', require('./orders'));
app.use('/lineItems', require('./lineItems'));
app.use('/users', require('./users'));
app.use('/productdeets', require('./productdeets'));
app.use('/reviews', require('./reviews'));
app.use('/workshops', require('./workshops'));


module.exports = app;
