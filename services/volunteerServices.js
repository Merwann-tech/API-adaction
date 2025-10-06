const { db } = require('../db');

function listVolunteers() {
    let name = db.prepare(`SELECT * FROM volunteer`)
    return name.all()
};

function getVolunteerByID(volunteerId) {
    const volunteer = db.prepare(`SELECT * FROM volunteer WHERE volunteers_id = ${volunteerId}`);
    return volunteer.get();
};

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

function addVolunteer(volunteerData) {
    const stmt = db.prepare('INSERT INTO volunteer (firstname, lastname, email, password, city_id, current_donation_point, spend_donation_point, total_donation_point) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',)
    stmt.run(
        volunteerData.firstname,
        volunteerData.lastname,
        volunteerData.email,
        volunteerData.password,
        volunteerData.city_id,
        0,
        0,
        0
    );
};

function deleteVolunteer(volunteerId) {
    const stmt = db.prepare('DELETE FROM volunteer WHERE volunteers_id = ?');
    stmt.run(volunteerId);
};

module.exports = { listVolunteers, getVolunteerPoints, getVolunteerByID, addVolunteer, deleteVolunteer };