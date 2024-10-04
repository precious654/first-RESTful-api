const express = require("express");
const router = express.Router();

router.get("/", function (req, res, next) {
    res.status(200).json({
        message: "Handling the GET request",
    });
});

router.post("/", function (req, res, next) {
    res.status(201).json({
        message: "Handling the POST request",
    });
});

router.get("/:id", function (req, res, next) {
    const id = req.params.id;
    if (id === "my-precious") {
        res.status(200).json({
            message: "You've found the special ID",
            id: id,
        });
    } else {
        res.status(200).json({
            message: "You passed in a valid ID",
        });
    }
});

router.patch("/:id", function (req, res, next) {
    res.status(200).json({
        message: "Updated the product",
    });
});

router.delete("/:id", function (req, res, next) {
    res.status(200).json({
        message: "Deleted the product",
    });
});

module.exports = router;