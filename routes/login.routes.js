const express = require('express');
const router = express.Router();
const { loginVolunteer } = require('../services/loginServices');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post('/', async (req, res) => {
    let response = await loginVolunteer(req.body.email, req.body.password)
    res.json(response);
})

module.exports = router;