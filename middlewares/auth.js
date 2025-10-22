require('dotenv').config();
const { verifyToken } = require('../services/tokenServices');
const idAdmin = process.env.idAdmin || 1

function verifyTokenVolunteer(req, res, next) {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.status(401).json({ message: "Token manquant" });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Format d'autorisation invalide" });
    }
    const decoded = verifyToken(token);
    if (decoded === null) {
        return res.status(403).json({ message: "Token invalide ou expiré" });
    } else {
        req.volunteerId = decoded.id;
        next()
    }
}

function verifyTokenAdmin(req, res, next) {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.status(401).json({ message: "Token manquant" });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Format d'autorisation invalide" });
    }

    const decoded = verifyToken(token);
    if (decoded === null) {
        return res.status(403).json({ message: "Token invalide ou expiré" });
    }
    else if (decoded.id == idAdmin) {
        req.volunteerId = decoded.id;
        next()
    } else {
        return res.status(403).json({ message: "Token invalide ou expiré" });
    }

}


module.exports = { verifyTokenVolunteer, verifyTokenAdmin };