const express = require('express');
const router = express.Router();
const { addCollect } = require('../services/collectServices');
const { verifyToken } = require('../services/tokenServices');
const { verifyTokenVolunteer, verifyTokenAdmin } = require('../middlewares/auth');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post('/', verifyTokenVolunteer, async (req, res) => {
  addCollect(
    req.volunteerId,
    req.body.date,
    req.body.city,
    req.body.waste.nb_butt,
    req.body.waste.nb_plastic,
    req.body.waste.nb_glass,
    req.body.waste.nb_metal,
    req.body.waste.nb_electronic,
    req.body.waste.nb_other
  )
  res.status(200).json({message : "collect ajouter"})
})

module.exports = router;