const { fetchWorkshops,
    createWorkshops} = require('../db');
    
    const express = require('express');
    const app = express.Router();
  
    app.get('/', async(req, res, next)=> {
      try {
        res.send(await fetchWorkshops());
      }
      catch(ex){
        next(ex);
      }
    });
    

    
    module.exports = app;
    