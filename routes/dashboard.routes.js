const express = require('express');
const router = express.Router();
const { getMonthlyStats } = require('../services/dashboardService');

function isYYYYMM(value) {
  return /^\d{4}-\d{2}$/.test(value);
}

router.get('/:date', async (req, res, next) => {
  try {
    const date = req.params.date;
    if (!isYYYYMM(date)) {
      const e = new Error('Format de date attendu: YYYY-MM');
      e.statusCode = 400;
      throw e;
    }
    const rows = await getMonthlyStats(date);
    res.status(200).json(rows);
  } catch (err) { next(err); }
});

module.exports = router;
