const express = require('express');
const router = express.Router();

const volunteers = require('./volunteers.routes');
const donation = require('./donation.routes'); 
const dashboard = require('./dashboard.routes'); 
const association = require('./association.routes');
const collect = require('./collect.routes');
const login = require('./login.routes');


router.use('/volunteers', volunteers);
router.use('/donation', donation);
router.use('/dashboard', dashboard);
router.use('/association', association);
router.use('/collect', collect);
router.use('/login', login);

module.exports = router;