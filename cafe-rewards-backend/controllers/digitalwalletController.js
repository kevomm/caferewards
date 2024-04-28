const DigitalWallets = require('../digitalwallets/digitalwalletsModel');

class DigitalWalletsController {

    // fetch all digital wallets
    async getAll(req, res) {
        try {
            const wallets = await DigitalWallets.findAll();
            res.json(wallets);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    // fetch a digital wallet by its id
    async getOne(req, res) {
        try {
            const wallet = await DigitalWallets.findByPk(req.params.id);
            if (wallet) return res.json(wallet);
            else return res.status(404).send('Digital wallet not found');
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    // create a new digital wallet
    async create(req, res) {
        try {
            const wallet = await DigitalWallets.create(req.body);
            res.status(201).json(wallet);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    // update a digital wallet
    async update(req, res) {
        try {
            const [updated] = await DigitalWallets.update(req.body, { where: { walletid: req.params.id } });
            if (updated) {
                const updatedWallet = await DigitalWallets.findByPk(req.params.id);
                res.json(updatedWallet);
            } else {
                res.status(404).send('Digital wallet not found');
            }
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

// delete a digital wallet
    async delete(req, res) {
        try {
            const deleted = await DigitalWallets.destroy({where: {walletid: req.params.id}});
            if (deleted) {
                res.send('Digital wallet deleted');
            } else {
                res.status(404).send('Digital wallet not found');
            }
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
}

module.exports = new DigitalWalletsController();