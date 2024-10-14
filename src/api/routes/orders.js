const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Order = require("../models/order");
const Product = require("../models/product");

router.get("/", (req, res, next) => {
  Order.find()
    .select("_id quantity productId createdAt updatedAt")
    .exec()
    .then((docs) => {
      console.log(docs);
      const response = {
        count: docs.length,
        orders: docs.map((doc) => {
          return {
            _id: doc._id,
            quantity: doc.quantity,
            productId: doc.productId,
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt,
            request: {
              type: "GET",
              url: "http://localhost:3000/orders/" + doc._id,
            },
          };
        }),
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.post("/", (req, res, next) => {
  Product.findById(req.body.productId)
    .then((product) => {
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        productId: req.body.productId,
        quantity: req.body.quantity,
      });
      return order.save();
    })
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Order has been created successfully",
        order: {
          id: result._id,
          productId: result.productId,
          quantity: result.quantity,
          createdAt: result.createdAt,
          updatedAt: result.updatedAt,
        },
        request: {
          type: "GET",
          url: "http://localhost:3000/orders/" + result._id,
          description: "Get the order details",
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.get("/:orderId", (req, res, next) => {
  const id = req.params.orderId;
  Order.findById(id)
    .select("_id productId quantity createdAt updatedAt")
    .exec()
    .then((result) => {
      console.log(result);
      if (!result) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.status(200).json({
        message: "Order returned successfully",
        order: result,
        request: {
          type: "GET",
          url: "http://localhost:3000/orders",
          description: "Get all orders",
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.delete("/:orderId", (req, res, next) => {
  const id = req.params.orderId;
  Order.deleteOne({ _id: id })
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: "Order deleted successfully",
        request: {
          type: "GET",
          url: "http://localhost:3000/orders",
          description: "Get all orders",
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

module.exports = router;
