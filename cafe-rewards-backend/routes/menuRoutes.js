const express = require('express');
const router = express.Router();
const MenuController = require('../menus/menusController');

router.get('/', MenuController.getAll);
router.get('/:id', MenuController.getOne);
router.post('/', MenuController.create);
router.put('/:id', MenuController.update);
router.delete('/:id', MenuController.delete);

module.exports = router;