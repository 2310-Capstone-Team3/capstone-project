const {
    fetchProductDeets,
} = require('../db')
const express = require('express');
const app = express.Router();
const { isLoggedIn, isAdmin } = require('./middleware');

app.get('/', async(req,res,next) => {
    try {
        res.send(await fetchProductDeets());
        
    } catch (ex) {
        next(ex)
        
    }
});
app.put('/productdeets/:id', isLoggedIn, isAdmin, (req, res, next)=> {
    res.send('hello world');
  });


module.exports = app;