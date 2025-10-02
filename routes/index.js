const express = require('express');
const router = express.Router();

const volunteers = require('./volunteers.routes');
const donation = require('./donation.routes'); 
const dashboard = require('./dashboard.routes'); 


router.use('/volunteer', volunteers);
router.use('/donation', donation);
router.use('/dashboard', dashboard);

module.exports = router;