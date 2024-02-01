const { fetchReview,
    createReview} = require('../db');
    
    const express = require('express');
    const app = express.Router();
  
    app.get('/', async(req, res, next)=> {
      try {
        res.send(await fetchReview());
      }
      catch(ex){
        next(ex);
      }
    });
    
    app.post('/', async(req, res, next) => {
      try {
        res.send(await createReview(req.body))
      } catch (error) {
        next(error)
      }
    });

    app.post('/reviews', async(res,req,next) =>{
        try {
            const SQL = `
            INSERT INTO reviews (name, body) 
            VALUES ($1,$2)
            RETURNING *
            `
            console.log(req.body)
            const response = await client.query(SQL, [req.body.name, req.body.body])
                res.send(response.rows[0])

        }catch(error){
            next(error)
        }
    })


  

    
    module.exports = app;
    