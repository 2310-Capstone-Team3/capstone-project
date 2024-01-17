const {
  fetchProducts,
} = require('../db');

const express = require('express');
const app = express.Router();
const { isLoggedIn, isAdmin } = require('./middleware');

app.get('/', async(req, res, next)=> {
  try {
    res.send(await fetchProducts());
  }
  catch(ex){
    next(ex);
  }
});
//'/products/:id'
app.put('/:id', isLoggedIn, isAdmin, async (req, res, next)=> {
  res.send('hello world');
});


module.exports = app;
