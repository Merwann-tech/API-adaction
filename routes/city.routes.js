const express = require('express');
const router = express.Router();
const { getCity } = require('../services/cityServices');


router.get('/', (req, res) => {
    let response = getCity();
    res.status(200).json(response);
})




module.exports = router;