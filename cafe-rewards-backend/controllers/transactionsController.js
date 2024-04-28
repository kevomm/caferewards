const Transaction = require('../transactions/transactionsModel');

class TransactionController {

    // fetch all transactions
    async getAll(req, res) {
        try {
            const transactions = await Transaction.findAll();
            res.json(transactions);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    // fetch a transaction by its id
    async getOne(req, res) {
        try {
            const transaction = await Transaction.findByPk(req.params.id);
            if (transaction) return res.json(transaction);
            else return res.status(404).send('Transaction not found');
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    // create a new transaction
    async create(req, res) {
        try {
            const transaction = await Transaction.create(req.body);
            res.status(201).json(transaction);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    // update a transaction
    async update(req, res) {
        try {
            await Transaction.update(req.body, { where: { transactionId: req.params.id } });
            res.send('Transaction updated');
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    // delete a transaction
    async delete(req, res) {
        try {
            await Transaction.destroy({ where: { transactionId: req.params.id } });
            res.send('Transaction deleted');
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
}

module.exports = new TransactionController();