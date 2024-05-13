const express = require('express');
const router = express.Router();
// Placeholder for your shop controller
// const shopController = require('../controllers/shopController');
const CoffeeShop = require('../models/coffeeshops');

// Add a new coffee shop
router.post('/create', async (req, res) => {
    try {
        await CoffeeShop.create(req.body);
        res.status(201).json({
            status: 200,
            message: 'successfully created coffeeshop'
        });
    } catch(error){
        res.status(500).json({
            status: 500,
            error: error.message
        });
    }
});

// Get a list of coffee shops
router.get('/', async (req, res) => {
    // shopController.listShop
    try {
        const coffeeShops = await CoffeeShop.findAll();
        res.status(200).json({
            status: 200,
            coffeeShops: coffeeShops
        });
    } catch(error) {
        res.status(500).json({
            status: 500,
            error: error.message
        });
    }
});

// Retrieve details of a specific coffee shop
router.get('/:id', (req, res) => {
    // shopController.getShop
    res.send('Retrieve details of a specific coffee shop');
});

// Update coffee shop details
router.put('/:id', (req, res) => {
    // shopController.updateShop
    res.send('Update coffee shop details');
});

// Delete a coffee shop
router.delete('/:id', (req, res) => {
    // shopController.deleteShop
    res.send('Delete a coffee shop');
});

module.exports = router;
