const { db } = require('../db');

function listVolunteers() {
    let name = db.prepare(`SELECT * FROM volunteer`)
    return name.all()
}

function getVolunteerPoints(volunteerId) {
    const stmt = db.prepare(`
      SELECT volunteers_id AS id,
             current_donation_point AS current,
             spend_donation_point AS spend,
             total_donation_point AS total
      FROM volunteer
      WHERE volunteers_id = ?
    `);
    const row = stmt.get(volunteerId);
    return row;
};

module.exports = { listVolunteers, getVolunteerPoints};