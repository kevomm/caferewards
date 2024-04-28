const express = require('express');
const router = express.Router();
const DigitalWalletsController = require('../digitalwallets/digitalwalletsController');

router.get('/', DigitalWalletsController.getAll);
router.get('/:id', DigitalWalletsController.getOne);
router.post('/', DigitalWalletsController.create);
router.put('/:id', DigitalWalletsController.update);
router.delete('/:id', DigitalWalletsController.delete);

module.exports = router;