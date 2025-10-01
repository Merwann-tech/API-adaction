const { getDb } = require('../db');

async function listPublic() {
  const db = await getDb();
  const rows = await db.all(
    `SELECT volunteers_id AS id,
            firstname,
            lastname,
            city_id,
            current_donation_point AS current,
            spend_donation_point   AS spend,
            total_donation_point   AS total
       FROM volunteer`
  );
  return rows;
}

async function getPoints(volunteerId) {
  const db = await getDb();
  const row = await db.get(
    `SELECT volunteers_id AS id,
            current_donation_point AS current,
            spend_donation_point   AS spend,
            total_donation_point   AS total
       FROM volunteer
      WHERE volunteers_id = ?`,
    volunteerId
  );
  return row || null;
}

module.exports = { listPublic, getPoints };
