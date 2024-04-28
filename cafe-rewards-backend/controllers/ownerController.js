const bcrypt = require('bcryptjs');
const Owner = require('../owners/ownersModel');

class OwnerController {

    // fetch all owners
    async getAll(req, res) {
        try {
            const owners = await Owner.findAll();
            res.json(owners);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    // fetch an owner by its id
    async getOne(req, res) {
        try {
            const owner = await Owner.findByPk(req.params.id);
            if (owner) return res.json(owner);
            else return res.status(404).send('Owner not found');
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    // create a new owner
    async create(req, res) {
        try {
            const owner = await Owner.create(req.body);
            res.status(201).json(owner);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    // update an owner
    async update(req, res) {
        try {
            await Owner.update(req.body, { where: { ownerId: req.params.id } });
            res.send('Owner updated');
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    // delete an owner
    async delete(req, res) {
        try {
            await Owner.destroy({ where: { ownerId: req.params.id } });
            res.send('Owner deleted');
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    // owner login
    async login(req, res) {
        try {
            const owner = await Owner.findOne({ where: { email: req.body.email } });
            if (owner && bcrypt.compareSync(req.body.password, owner.password)) {
                res.send('Login successful');
            } else {
                res.status(401).send('Invalid email or password');
            }
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
}

module.exports = new OwnerController();