const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Product = require("../models/product");

router.get("/", function (req, res, next) {
  Product.find()
    .exec()
    .then((docs) => {
      console.log("Documents:", docs);
      res.status(200).json(docs);
    })
    .catch((err) => {
      console.log("Error retrieving documents:", err);
      res.status(500).json({ error: err });
    });
});

router.post("/", function (req, res, next) {
  4;
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
  });
  product
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Handling the POST request",
        createdProduct: product,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.get("/:id", function (req, res, next) {
  const id = req.params.id;
  Product.findById(id)
    .exec()
    .then((doc) => {
      console.log(doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.patch("/:id", function (req, res, next) {
  const id = req.params.id;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Product.updateOne({ _id: id }, { $set: updateOps })
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.delete("/:id", function (req, res, next) {
  const id = req.params.id;
  Product.deleteOne({ _id: id })
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

module.exports = router;
