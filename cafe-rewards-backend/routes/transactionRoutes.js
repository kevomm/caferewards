const express = require('express');
const router = express.Router();
const TransactionController = require('../transactions/transactionsController');

router.get('/', TransactionController.getAll);
router.get('/:id', TransactionController.getOne);
router.post('/', TransactionController.create);
router.put('/:id', TransactionController.update);
router.delete('/:id', TransactionController.delete);

module.exports = router;