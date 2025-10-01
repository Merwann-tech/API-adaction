const express = require('express');
const router = express.Router();
const { listAll } = require('../services/associationService');

router.get('/', async (req, res, next) => {
  try {
    const rows = await listAll();
    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
