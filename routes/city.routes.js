const express = require('express');
const router = express.Router();
const { getCity } = require('../services/cityServices');
const {verifyTokenVolunteer,verifyTokenAdmin } = require('../middlewares/auth');


router.get('/',verifyTokenVolunteer, (req, res) => {
    let response = getCity();
    res.status(200).json(response);
})




module.exports = router;