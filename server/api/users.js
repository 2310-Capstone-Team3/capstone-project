const {
    fetchUsers,
    createUser,
    fetchUserById,
    resetUserPassword
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

app.get('/:userId', async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const user = await fetchUserById(userId);
        res.send(user);
    } catch (error) {
        next(error);
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

app.patch('/:userId/reset-password', async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const newPassword = req.body.password;
        const updatedUser = await resetUserPassword(userId, newPassword);
        res.send(updatedUser);
    } catch (error) {
        next(error);
    }
});

module.exports = app;