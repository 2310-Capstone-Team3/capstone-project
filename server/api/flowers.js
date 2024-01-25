const { fetchFlowers,
    createFlowers} = require('../db');
    
    const express = require('express');
    const app = express.Router();
  
    app.get('/', async(req, res, next)=> {
      try {
        res.send(await fetchFlowers());
      }
      catch(ex){
        next(ex);
      }
    });
    
    app.post('/', async(req, res, next) => {
        try {
          res.send(await createFlowers(req.body))
        } catch (error) {
          next(error)
        }
      });
    
    module.exports = app;