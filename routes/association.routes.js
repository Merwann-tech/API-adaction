const express = require('express');
const router = express.Router();
const {getAssociation} = require('../services/associationServices');
const {verifyTokenVolunteer,verifyTokenAdmin } = require('../middlewares/auth');

router.get('/',verifyTokenVolunteer, (req, res) => {
    let associations = getAssociation();
    res.status(200).json(associations);
})

module.exports = router;