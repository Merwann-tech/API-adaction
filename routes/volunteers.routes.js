const express = require('express');
const router = express.Router();
const { listVolunteers } = require('../services/volunteerServices');

router.get('/', (req, res) => {
  const name = listVolunteers()
  res.send(name)
})

router.get('/point/:id', (req, res) => {
    const volunteerId = Number(req.params.id);
    const stmt = db.prepare(`
      SELECT volunteers_id AS id,
             current_donation_point AS current,
             spend_donation_point AS spend,
             total_donation_point AS total
      FROM volunteer
      WHERE volunteers_id = ?
    `);
    const row = stmt.get(volunteerId);
    res.status(200).json(row);
});



module.exports = router;