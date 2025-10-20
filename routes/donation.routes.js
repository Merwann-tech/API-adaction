const express = require('express');
const router = express.Router();
const { donationUpdate } = require('../services/donationServices');
const { verifyToken } = require('../services/tokenServices');
const { verifyTokenVolunteer, verifyTokenAdmin } = require('../middlewares/auth');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post('/', verifyTokenVolunteer, async (req, res) => {
    let response = donationUpdate(req.volunteerId, req.body.association_id)
    res.status(201).json(response);
});


module.exports = router;