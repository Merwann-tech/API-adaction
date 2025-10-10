const express = require('express');
const router = express.Router();
const { listVolunteers, getVolunteerPoints, getVolunteerByID, addVolunteer, deleteVolunteer , editeVolunteer} = require('../services/volunteerServices');
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

router.post('/', async (req, res) => {
    let response = await addVolunteer(req.body)
    res.status(201).json(response);
});

router.delete('/:id', (req, res) => {
    const volunteerId = Number(req.params.id);
    deleteVolunteer(volunteerId);
    res.status(200).send('Volunteer deleted');
});

router.put('/:id', async (req, res) => {
    const volunteerId = Number(req.params.id);
    let response = await editeVolunteer(volunteerId,req.body);
    res.status(200).json(response);
});

module.exports = router;