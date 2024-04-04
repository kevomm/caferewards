const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController');

// Place a new order
router.post('/', ordersController.createOrder);

// Get a list of orders
router.get('/', ordersController.listOrders);

// Retrieve details of a specific order
router.get('/:id', ordersController.getOrder);

// Update order details
router.put('/:id', ordersController.updateOrder);

// Cancel an order
router.delete('/:id', ordersController.deleteOrder);

module.exports = router;
