const { db } = require('../db');

function listVolunteers() {
    let name = db.prepare(`SELECT 
    v.volunteers_id,
    v.firstname,
    v.lastname,
    v.email,
    c.name AS city_name
    FROM volunteer AS v
    JOIN city AS c 
    ON v.city_id = c.city_id;`)
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
    let city = capitalize(volunteerData.city)
    db.exec(`
        INSERT INTO city (name)
        SELECT '${city}'
        WHERE NOT EXISTS (SELECT 1 FROM city WHERE name = '${city}');`)
    db.exec(`
        INSERT INTO volunteer (firstname, lastname, email, password, city_id,current_donation_point, spend_donation_point, total_donation_point)
        VALUES (
            '${volunteerData.firstname}',
            '${volunteerData.lastname}',
            '${volunteerData.email}',
            '${volunteerData.password}',
            (SELECT city_id FROM city WHERE name = '${city}'),
            0,
            0,
            0
        );`,)
};

function deleteVolunteer(volunteerId) {
    const stmt = db.prepare('DELETE FROM collect WHERE volunteer_id = ?');
    stmt.run(volunteerId);
    const stmt1 = db.prepare('DELETE FROM volunteer WHERE volunteers_id = ?');
    stmt1.run(volunteerId);
};

function editeVolunteer(volunteerId, volunteerData) {
    const stmt = db.prepare('UPDATE volunteer SET firstname = ?, lastname = ?, email = ?, password = ?, city_id = ? WHERE volunteers_id = ?');
    stmt.run(
        volunteerData.firstname,
        volunteerData.lastname,
        volunteerData.email,
        volunteerData.password,
        volunteerData.city_id,
        volunteerId
    )
}

function capitalize(city){
    let cityLower = city.toLowerCase()
    let cityCapitalize = cityLower[0].toUpperCase() + cityLower.slice(1)
    return cityCapitalize
}

module.exports = { listVolunteers, getVolunteerPoints, getVolunteerByID, addVolunteer, deleteVolunteer, editeVolunteer };