const express = require('express');
const router = express.Router();
const {donationUpdate} = require('../services/donationServices');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post('/', (req, res) => {
    res.status(201).json({ status: "donation effectuée." });
    donationUpdate(req.body.volunteer_id,req.body.association_id)
});


module.exports = router;