const express = require("express");

const router = express.Router();

const Product = require("../models/Product");

const importData = require("../data.json");

router.get("/", async (req, res) => {
  const products = await Product.find({});
  // res.send(importData);
  res.send(products);
});

router.post("/", async (req, res) => {
  const newProduct = new Product(req.body);
  const savedProduct = await newProduct.save();
  res.send(savedProduct);
});

router.delete("/:id", async (req, res) => {
  const deletedProduct = await Product.findByIdAndDelete(req.params.id);
  res.send(deletedProduct);
});

module.exports = router;
