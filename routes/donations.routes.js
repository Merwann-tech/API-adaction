const express = require('express');
const router = express.Router();
const { donate } = require('../services/donationService');

function parsePositiveInt(value, field) {
  const n = Number(value);
  if (!Number.isInteger(n) || n <= 0) {
    const e = new Error(`Paramètre invalide: ${field}`);
    e.statusCode = 400;
    throw e;
  }
  return n;
}

router.post('/', async (req, res, next) => {
  try {
    const volunteerId = parsePositiveInt(req.body.volunteer_id, 'volunteer_id');
    const associationId = parsePositiveInt(req.body.association_id, 'association_id');
    const result = await donate(volunteerId, associationId);
    res.status(201).json({ status: 'donation effectuée', donation: result.donation });
  } catch (err) { next(err); }
});

module.exports = router;
