const Order = require('../orders/ordersModel');

class OrderController {

    // fetch all orders
    async getAll(req, res) {
        try {
            const orders = await Order.findAll();
            res.json(orders);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    // fetch an order by its id
    async getOne(req, res) {
        try {
            const order = await Order.findByPk(req.params.id);
            if (order) return res.json(order);
            else return res.status(404).send('Order not found');
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    // create a new order
    async create(req, res) {
        try {
            const order = await Order.create(req.body);
            res.status(201).json(order);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    // update an order
    async update(req, res) {
        try {
            await Order.update(req.body, { where: { orderId: req.params.id } });
            res.send('Order updated');
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    // delete an order
    async delete(req, res) {
        try {
            await Order.destroy({ where: { orderId: req.params.id } });
            res.send('Order deleted');
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
}

module.exports = new OrderController();