const express = require('express');
const router = express.Router();
const { checkout } = require('../controllers/stripeController');
// const OrderController = require('../controllers/ordersController');

// router.get('/', OrderController.getAll);
// router.get('/:id', OrderController.getOne);
// router.post('/', OrderController.create);
// router.put('/:id', OrderController.update);
// router.delete('/:id', OrderController.delete);


router.post('/checkout', async (req, res) => {
    const {products, coffeeShop} = req.body;
    const { stripeId } = req.user;
    try {
        const session = await checkout(stripeId, products, coffeeShop);
        res.status(200).json({
            success: true,
            sessionId: session.id,
        });
    } catch(error) {
        res.status(500).json({
            status: 500,
            error: error.message
        });
    }
});


module.exports = router;