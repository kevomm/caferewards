const express = require('express');
const router = express.Router();
const rewardsController = require('../controllers/rewardsController');

// Create a new reward
router.post('/', rewardsController.createReward);

// Retrieve a list of rewards
router.get('/', rewardsController.listRewards);

// Get details of a specific reward
router.get('/:id', rewardsController.getReward);

// Update reward details
router.put('/:id', rewardsController.updateReward);

// Remove a reward from the system
router.delete('/:id', rewardsController.deleteReward);

module.exports = router;
