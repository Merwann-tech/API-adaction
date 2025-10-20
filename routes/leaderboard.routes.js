const express = require('express');
const router = express.Router();
const { getLeaderboard } = require('../services/leaderboardServices');
const { verifyTokenVolunnter,verifyTokenAdmin } = require('../middlewares/auth');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get('/',verifyTokenAdmin, (req, res) => {
    const leaderboard = getLeaderboard()
    res.status(200).json(leaderboard);
})

module.exports = router;