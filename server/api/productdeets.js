const { fetchProductDeets, createProductDeets } = require("../db");
const express = require("express");
const app = express.Router();

app.get("/", async (req, res, next) => {
  try {
    res.send(await fetchProductDeets());
  } catch (ex) {
    next(ex);
  }
});

app.post("/", async (req, res, next) => {
  try {
    res.send(await createProductDeets(req.body));
  } catch (error) {
    next(error);
  }
});
app.put("/productdeets/:id", async (req, res, next) => {
  res.send("hello world");
});

module.exports = app;
