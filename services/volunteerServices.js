const { db } = require('../db');

function listVolunteers() {
    let name = db.prepare(`SELECT * FROM volunteer`)
    return name.all()
}


module.exports = { listVolunteers };