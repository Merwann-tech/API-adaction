const express = require('express');
const router = express.Router();
const { getMonthCollect } = require('../services/dashboardServices');
const {verifyTokenVolunteer,verifyTokenAdmin } = require('../middlewares/auth');

router.get('/:date',verifyTokenVolunteer, async (req, res) => {
  let collect = getMonthCollect(req.params.date,req.volunteerId)
  res.status(200).json(collect)
})

module.exports = router;