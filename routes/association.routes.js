const express = require('express');
const router = express.Router();
const {getAssociation} = require('../services/associationServices');


router.get('/', (req, res) => {
  try {
    let associations = getAssociation();
    res.status(200).json(associations);
  } catch (error) {
    res.status(500).json({ erreur: error.message });
  }
})

module.exports = router;