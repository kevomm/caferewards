const Reward = require('../rewards/rewardsModel');

class RewardController {

    // fetch all rewards
    async getAll(req, res) {
        try {
            const rewards = await Reward.findAll();
            res.json(rewards);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    // fetch a reward by its id
    async getOne(req, res) {
        try {
            const reward = await Reward.findByPk(req.params.id);
            if (reward) return res.json(reward);
            else return res.status(404).send('Reward not found');
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    // create a new reward
    async create(req, res) {
        try {
            const reward = await Reward.create(req.body);
            res.status(201).json(reward);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    // update a reward
    async update(req, res) {
        try {
            await Reward.update(req.body, { where: { rewardId: req.params.id } });
            res.send('Reward updated');
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    // delete a reward
    async delete(req, res) {
        try {
            await Reward.destroy({ where: { rewardId: req.params.id } });
            res.send('Reward deleted');
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
}

module.exports = new RewardController();