const jwt = require('jsonwebtoken');

const ACCESS_SECRET = process.env.ACCESS_SECRET || 'admin';

function createToken(payload) {
    return jwt.sign(payload, ACCESS_SECRET, { algorithm: 'HS256', expiresIn: '30min' });
}


function verifyToken(token) {
    try {
        return jwt.verify(token, ACCESS_SECRET);
    } catch (err) {
        return null; 
    }
}

module.exports = {createToken,verifyToken}