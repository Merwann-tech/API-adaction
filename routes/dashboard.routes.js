const express = require('express');
const router = express.Router();
const { getMonthCollect } = require('../services/dashboardServices');
const { verifyToken } = require('../services/tokenServices');

router.get('/:date/:token', async(req, res) => {
  const id = await verifyToken(req.params.token);
  if (id === null) {
    res.status(401).send('Invalid token');
  } else {
    let collect = getMonthCollect(req.params.date, id.id)
    res.send(collect)
  }
})

module.exports = router;