const {
  fetchProducts,
  changeProductName,
  changeProductDescription,
  changeProductPrice,
  createProduct,
  changeItemVipStatus,
} = require('../db');

const express = require('express');
const app = express.Router();
const {isLoggedIn, isAdmin } = require('./middleware')

app.get('/', async(req, res, next)=> {
  try {
    res.send(await fetchProducts());
  }
  catch(ex){
    next(ex);
  }
});

app.post('/', async(req, res, next) => {
  try {
    res.send(await createProduct(req.body))
  } catch (error) {
    next(error)
  }
})

app.put('/:id', isLoggedIn, isAdmin, async (req, res, next)=> {
  res.send(await createProduct({id: req.params.id, ...req.body}));
});

app.patch('/:productId/change-product-name', async (req, res, next) => {
  try {
      const productId = req.params.productId
      const name = req.body.name
      const updatedProduct = await changeProductName(productId, name)
      res.send(updatedProduct)
  } catch (error) {
      next(error)
  }
})

app.patch('/:productId/change-product-description', async (req, res, next) => {
  try {
      const productId = req.params.productId
      const description = req.body.description
      const updatedProduct = await changeProductDescription(productId, description)
      res.send(updatedProduct)
  } catch (error) {
      next(error)
  }
})

app.patch('/:productId/change-product-price', async (req, res, next) => {
  try {
      const productId = req.params.productId
      const price = req.body.price
      const updatedProduct = await changeProductPrice(productId, price)
      res.send(updatedProduct)
  } catch (error) {
      next(error)
  }
})

app.patch('/:productId/change-vip-status', async (req, res, next) => {
  try {
      const productId = req.params.productId
      const status = req.body.status
      const updatedProduct = await changeItemVipStatus(productId, status)
      res.send(updatedProduct)
  } catch (error) {
      next(error)
  }
})



module.exports = app;
