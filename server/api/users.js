const {
    fetchUsers,
    createUser
} = require('../db');

const express = require('express');
const app = express.Router();

app.get('/', async(req, res, next)=> {
    try {
        res.send(await fetchUsers());
    }
    catch(ex){
        next(ex);
    }
});

app.post('/', async(req, res, next) => {
    try {
        const user = req.body
        const createdUser = await createUser(user)
        res.send(createdUser)
    } catch (error) {
        next(error)
    }
})

module.exports = app;