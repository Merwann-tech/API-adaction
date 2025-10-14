const { db } = require('../db');

function getCity() {
const stmt = db.prepare(`SELECT name FROM city`);
return stmt.all();
}

module.exports = {getCity};