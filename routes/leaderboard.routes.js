const express = require('express');
const router = express.Router();
const { getLeaderboard } = require('../services/leaderboardServices');

router.get('/', (req, res) => {
    const leaderboard = getLeaderboard()
    res.status(200).json(leaderboard);
})

module.exports = router;