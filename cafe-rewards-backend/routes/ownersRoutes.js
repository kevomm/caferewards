const express = require('express');
const router = express.Router();
const OwnerController = require('../owners/ownersController');

router.get('/', OwnerController.getAll);
router.get('/:id', OwnerController.getOne);
router.post('/', OwnerController.create);
router.post('/login', OwnerController.login);
router.put('/:id', OwnerController.update);
router.delete('/:id', OwnerController.delete);

module.exports = router;