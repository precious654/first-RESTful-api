const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Orders requested successfully',
    });
});

router.post('/', (req, res, next) => {
    res.status(201).json({
        message: 'Order has been created successfully',
    });
});

router.get('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'Order details',
        id: req.params.orderId,
    });
});

router.delete('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'Order deleted successfully',
        id: req.params.orderId,
    });
});

module.exports = router;