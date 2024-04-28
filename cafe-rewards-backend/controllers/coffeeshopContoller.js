const CoffeeShops = require('../coffeeshops/coffeeshopsModel');

class CoffeeShopsController {

    // this can be used to fetch all coffeeshops
    async getAll(req, res) {
        try {
            const coffeeShops = await CoffeeShops.findAll();
            res.json(coffeeShops);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    // this can be used to fetch a coffeeshop by its id
    async getOne(req, res) {
        try {
            const coffeeShop = await CoffeeShops.findByPk(req.params.id);
            if (coffeeShop) return res.json(coffeeShop);
            else return res.status(404).send('Coffee shop not found');
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    // this can be used to create a new coffeeshop
    async create(req, res) {
        try {
            const coffeeShop = await CoffeeShops.create(req.body);
            res.status(201).json(coffeeShop);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    // this can be used to update a coffeeshop
    async update(req, res) {
        try {
            await CoffeeShops.update(req.body, { where: { shopid: req.params.id } });
            res.send('Coffee shop updated');
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    // this can be used to delete a coffeeshop
    async delete(req, res) {
        try {
            await CoffeeShops.destroy({ where: { shopid: req.params.id } });
            res.send('Coffee shop deleted');
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
}

module.exports = new CoffeeShopsController();