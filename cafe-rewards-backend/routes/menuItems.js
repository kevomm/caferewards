const express = require('express');
const router = express.Router();
const CoffeeShop = require('../models/coffeeshops');
const Menus = require('../models/menu');
const MenuItem = require('../models/menuItem');


MenuItem.belongsTo(Menus, {foreignKey: 'menuid'});
Menus.hasMany(MenuItem, {foreignKey: 'menuid'});

CoffeeShop.hasMany(Menus, {foreignKey: 'shopid'});
Menus.belongsTo(CoffeeShop, {foreignKey: 'shopid'});





router.post('/create', async (req, res) => {
    try {
        await MenuItem.create(req.body);
        res.status(201).json({
            status: 200,
            message: 'successfully created menu item'
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
        const menuItems = await MenuItem.findAll();
        res.status(200).json({
            status: 200,
            menuItems: menuItems
        });
    } catch(error) {
        res.status(500).json({
            status: 500,
            error: error.message
        });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const shopid = req.params.id;
        const menuItems = await MenuItem.findAll({
            include: [
                {
                    model: Menus,
                    where: {shopid: shopid},
                    include: CoffeeShop
                }
            ]
        });

        res.status(200).json({
            status: 200,
            menuItems: menuItems
        });
    } catch(error) {
        res.status(500).json({
            status: 500,
            error: error.message
        });
    }
});

module.exports = router;