const express = require('express');
const router = express.Router();

const volunteers = require('./volunteers.routes');
const donation = require('./donation.routes'); 


router.use('/volunteer', volunteers);
router.use('/donation', donation);

module.exports = router;