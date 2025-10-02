const { db } = require('../db');

function getAssociation() {
const stmt = db.prepare(`SELECT * FROM association`);
return stmt.all();
}

module.exports = {getAssociation};