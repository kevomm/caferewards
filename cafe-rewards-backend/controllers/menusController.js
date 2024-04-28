const Menu = require('../menus/menusModel');

class MenuController {

    // fetch all menu items
    async getAll(req, res) {
        try {
            const menuItems = await Menu.findAll();
            res.json(menuItems);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    // fetch a menu item by its id
    async getOne(req, res) {
        try {
            const menuItem = await Menu.findByPk(req.params.id);
            if (menuItem) return res.json(menuItem);
            else return res.status(404).send('Menu item not found');
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    // create a new menu item
    async create(req, res) {
        try {
            const menuItem = await Menu.create(req.body);
            res.status(201).json(menuItem);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    // update a menu item
    async update(req, res) {
        try {
            await Menu.update(req.body, { where: { menuid: req.params.id } });
            res.send('Menu item updated');
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    // delete a menu item
    async delete(req, res) {
        try {
            await Menu.destroy({ where: { menuid: req.params.id } });
            res.send('Menu item deleted');
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
}

module.exports = new MenuController();