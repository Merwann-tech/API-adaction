const express = require('express');
const router = express.Router();
const { verifyToken } = require('../services/tokenServices');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const idAdmin = process.env.idAdmin || 1

router.get('/', async (req, res) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        return res.status(401).json({ message: "Token manquant" });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Format d'autorisation invalide" });
    }
    const decoded = verifyToken(token);
    if (decoded !=null){
        if (decoded.id == idAdmin){
            res.send({ message: 'Token is valid and user is admin'})
        }else{
        res.send({ message: 'Token is valid'})
        }
    }else{
        res.status(401).send({ message: 'Invalid token' });
    }
    
})

module.exports = router;