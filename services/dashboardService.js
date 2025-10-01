const { getDb } = require('../db');

async function getMonthlyStats(yyyyMm) {
  const db = await getDb();
  const rows = await db.all(
    `SELECT
       SUM(nb_butt)       AS nb_butt,
       SUM(nb_plastic)    AS nb_plastic,
       SUM(nb_glass)      AS nb_glass,
       SUM(nb_metal)      AS nb_metal,
       SUM(nb_electronic) AS nb_electronic,
       SUM(nb_other)      AS nb_other
     FROM collect
     WHERE strftime('%Y-%m', date) = ?`,
    yyyyMm
  );
  return rows;
}

module.exports = { getMonthlyStats };
