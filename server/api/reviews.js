const { fetchReviews,
  createReviews} = require('../db');
  
  const express = require('express');
  const app = express.Router();

  app.get('/', async(req, res, next)=> {
    try {
      res.send(await fetchReviews());
    }
    catch(ex){
      next(ex);
    }
  });
  
  app.post('/', async(req, res, next) => {
    try {
      res.send(await createReviews(req.body))
    } catch (error) {
      next(error)
    }
  });

  app.post('/addReview', async (req, res) => {
    const { username, comment, rating } = req.body;
  
    try {
      const newReview = newReview({ username, comment, rating });
      await newReview.save();
      res.status(201).json({ message: 'Review added successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  app.get('/getReviews', async (req, res) => {
    try {
      const reviews = await review.find();
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  module.exports = app;
  