const express = require('express');
const router = express.Router();
const { listVolunteers,
    getVolunteerPoints,
    getVolunteerByID,
    addVolunteer,
    deleteVolunteer,
    editeVolunteer,
    listVolunteersByCity,
    listVolunteersByName,
    listVolunteersByNameAndCity } = require('../services/volunteerServices');
const { verifyToken } = require('../services/tokenServices');
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get('/', (req, res) => {
    const name = listVolunteers()
    res.send(name)
})

router.get('/city/:city', (req, res) => {
    const name = listVolunteersByCity(req.params.city)
    res.send(name)
})

router.get('/city/:city/name/:name/', (req, res) => {
    const name = listVolunteersByNameAndCity(req.params.name, req.params.city)
    res.send(name)
})

router.get('/name/:name', (req, res) => {
    const name = listVolunteersByName(req.params.name)
    res.send(name)
})


router.get('/point/:token', async (req, res) => {
    const id = await verifyToken(req.params.token);
    if (id === null) {
        res.status(401).send('Invalid token');
    } else {
        const volunteerId = Number(id.id);
        const row = getVolunteerPoints(volunteerId);
        res.status(200).json(row);
    }
});

router.get('/:id', (req, res) => {
    const volunteerId = Number(req.params.id);
    const row = getVolunteerByID(volunteerId);
    res.status(200).json(row);
});

router.get('/token/:token', async (req, res) => {
    const id = await verifyToken(req.params.token);
    if (id === null) {
        res.status(401).send('Invalid token');
    } else {
        const volunteerId = Number(id.id);
        const row = getVolunteerByID(volunteerId);
        res.status(200).json(row);
    }
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
    let response = await editeVolunteer(volunteerId, req.body);
    res.status(200).json(response);
});

module.exports = router;