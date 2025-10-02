const express = require('express');
const router = express.Router();
const { listVolunteers, getVolunteerPoints} = require('../services/volunteerServices');


router.get('/', (req, res) => {
  const name = listVolunteers()
  res.send(name)
})

router.get('/point/:id', (req, res) => {
    const volunteerId = Number(req.params.id);
    const row = getVolunteerPoints(volunteerId);
    res.status(200).json(row);
});



module.exports = router;