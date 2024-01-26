const {
    fetchUsers,
    createUser,
    fetchUserById,
    resetUserPassword,
    resetUserUsername,
    resetUserEmail,
    resetUserAddress,
    changeVipStatus,
    changeAdminStatus
} = require('../db');

const express = require("express");
const app = express.Router();

app.get("/", async (req, res, next) => {
  try {
    res.send(await fetchUsers());
  } catch (ex) {
    next(ex);
  }
});

app.get("/:userId", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await fetchUserById(userId);
    res.send(user);
  } catch (error) {
    next(error);
  }
});

app.post("/", async (req, res, next) => {
  try {
    const user = req.body;
    const createdUser = await createUser(user);
    res.send(createdUser);
  } catch (error) {
    next(error);
  }
});

app.patch("/:userId/reset-password", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const newPassword = req.body.password;
    const updatedUser = await resetUserPassword(userId, newPassword);
    res.send(updatedUser);
  } catch (error) {
    next(error);
  }
});

app.patch("/:userId/reset-username", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const newUsername = req.body.username;
    const updatedUser = await resetUserUsername(userId, newUsername);
    res.send(updatedUser);
  } catch (error) {
    next(error);
  }
});

app.patch("/:userId/reset-email", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const newEmail = req.body.email;
    const updatedUser = await resetUserEmail(userId, newEmail);
    res.send(updatedUser);
  } catch (error) {
    next(error);
  }
});

app.patch("/:userId/reset-address", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const newAddress = req.body.address;
    const updatedUser = await resetUserAddress(userId, newAddress);
    res.send(updatedUser);
  } catch (error) {
    next(error);
  }
});

app.patch('/:userId/change-vip-status', async (req, res, next) => {
    try {
        const userId = req.params.userId
        const vipStatus = req.body.status
        const updatedUser = await changeVipStatus(userId, vipStatus)
        res.send(updatedUser)
    } catch (error) {
        next(error)
    }
})

app.patch('/:userId/change-admin-status', async (req, res, next) => {
    try {
        const userId = req.params.userId
        const adminStatus = req.body.status
        const updatedUser = await changeAdminStatus(userId, adminStatus)
        res.send(updatedUser)
    } catch (error) {
        next(error)
    }
})

module.exports = app;
