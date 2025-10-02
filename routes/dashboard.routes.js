const express = require('express');
const router = express.Router();
const {getMonthCollect} = require('../services/dashboardServices');

router.get('/:date', (req, res) => {
  let collect = getMonthCollect(req.params.date)
  res.send(collect)
})

module.exports = router;