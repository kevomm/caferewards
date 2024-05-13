const express = require('express');
const router = express.Router();
const MenuController = require('../controllers/menusController');
const Menu = require("../models/menu");

router.post('/create', async (req, res) => {
    try {
        await Menu.create(req.body);
        res.status(201).json({
            status: 200,
            message: 'successfully created menu'
        });
    } catch(error){
        res.status(500).json({
            status: 500,
            error: error.message
        });
    }
});

router.get('/', async (req, res) => {
    try {
        const menus = await Menu.findAll();
        res.status(200).json({
            status: 200,
            menus: menus
        });
    } catch(error) {
        res.status(500).json({
            status: 500,
            error: error.message
        });
    }
})


router.get('/:id', MenuController.getOne);
router.post('/', MenuController.create);
router.put('/:id', MenuController.update);
router.delete('/:id', MenuController.delete);

module.exports = router;