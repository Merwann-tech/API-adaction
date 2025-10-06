const express = require('express');
const router = express.Router();
const { listVolunteers, getVolunteerPoints, getVolunteerByID, addVolunteer} = require('../services/volunteerServices');
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get('/', (req, res) => {
  const name = listVolunteers()
  res.send(name)
})

router.get('/point/:id', (req, res) => {
    const volunteerId = Number(req.params.id);
    const row = getVolunteerPoints(volunteerId);
    res.status(200).json(row);
});

router.get('/:id', (req, res) => {
    const volunteerId = Number(req.params.id);
    const row = getVolunteerByID(volunteerId);
    res.status(200).json(row);
});

router.post('/', (req, res) => {
    addVolunteer(req.body)
    res.status(201).send('Volunteer added');
});
module.exports = router;