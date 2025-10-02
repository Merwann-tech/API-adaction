const express = require('express');
const router = express.Router();

const volunteers = require('./volunteers.routes');

router.use('/volunteer', volunteers);


module.exports = router;