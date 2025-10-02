const express = require('express');
const router = express.Router();
const {addCollect} = require('../services/collectServices');


router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post('/', (req, res) => {
  addCollect(
    req.body.volunteer_id,
    req.body.date,
    req.body.city_id,
    req.body.nb_butt,
    req.body.nb_plastic,
    req.body.nb_glass,
    req.body.nb_metal,
    req.body.nb_electronic,
    req.body.nb_other
  ) 
  res.status(201).json({ status: "collect ajouté" });
})

module.exports = router;