const express = require('express');
const router = express.Router();
const { donationUpdate } = require('../services/donationServices');
const { verifyToken } = require('../services/tokenServices');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post('/', async (req, res) => {
    const id = await verifyToken(req.body.token);
    if (id === null) {
        res.status(401).send('Invalid token');
    } else {
        let response = donationUpdate(id.id, req.body.association_id)
        res.status(201).json(response);

    }
});


module.exports = router;