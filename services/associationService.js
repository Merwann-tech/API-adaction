const { getDb } = require('../db');

async function listAll() {
  const db = await getDb();
  const rows = await db.all(`SELECT * FROM association`);
  return rows;
}

module.exports = { listAll };
