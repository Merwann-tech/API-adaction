const express = require('express');
const router = express.Router();

const donations = require('./donations.routes');
const volunteers = require('./volunteers.routes');
const associations = require('./associations.routes');
const dashboard = require('./dashboard.routes');

router.use('/donate', donations);
router.use('/volunteer', volunteers);
router.use('/association', associations);
router.use('/dashboard', dashboard);

module.exports = router;
