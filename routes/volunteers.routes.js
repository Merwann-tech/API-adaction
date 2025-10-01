const express = require('express');
const router = express.Router();
const { listPublic, getPoints } = require('../services/volunteerService');

function parsePositiveInt(value, field) {
  const n = Number(value);
  if (!Number.isInteger(n) || n <= 0) {
    const e = new Error(`Paramètre invalide: ${field}`);
    e.statusCode = 400;
    throw e;
  }
  return n;
}

router.get('/', async (req, res, next) => {
  try {
    const rows = await listPublic();
    res.status(200).json(rows);
  } catch (err) { next(err); }
});

router.get('/point/:id', async (req, res, next) => {
  try {
    const id = parsePositiveInt(req.params.id, 'id');
    const row = await getPoints(id);
    if (!row) return res.status(404).json({ error: 'Bénévole introuvable' });
    res.status(200).json(row);
  } catch (err) { next(err); }
});

module.exports = router;
