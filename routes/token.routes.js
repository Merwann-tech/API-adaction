const express = require('express');
const router = express.Router();
const { verifyToken } = require('../services/tokenServices');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get('/', async (req, res) => {
    let token = verifyToken(req.body.token)
    if (token !=null){
        if (token.id == 1){
            res.send({ message: 'Token is valid and user is admin'})
        }else{
        res.send({ message: 'Token is valid'})
        }
    }else{
        res.status(401).send({ message: 'Invalid token' });
    }
    
})

module.exports = router;