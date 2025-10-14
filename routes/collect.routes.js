const express = require('express');
const router = express.Router();
const { addCollect } = require('../services/collectServices');
const { verifyToken } = require('../services/tokenServices');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post('/', async (req, res) => {
  const id = await verifyToken(req.body.token);
  if (id === null) {
    res.status(401).send('Invalid token');
  } else {
    addCollect(
      id.id,
      req.body.date,
      req.body.city,
      req.body.waste.nb_butt,
      req.body.waste.nb_plastic,
      req.body.waste.nb_glass,
      req.body.waste.nb_metal,
      req.body.waste.nb_electronic,
      req.body.waste.nb_other
    )
    res.status(201).json({ status: "collect ajouté" });
  }
})

module.exports = router;