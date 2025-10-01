const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

let dbPromise;

async function getDb() {
  if (!dbPromise) {
    dbPromise = open({
      filename: process.env.DB_PATH || './database.db',
      driver: sqlite3.Database,
    }).then(async (db) => {
      // Activer les clés étrangères et un mode journal correct
      await db.exec('PRAGMA foreign_keys = ON;');
      return db;
    });
  }
  return dbPromise;
}

async function withTransaction(work) {
  const db = await getDb();
  try {
    await db.exec('BEGIN');
    const result = await work(db);
    await db.exec('COMMIT');
    return result;
  } catch (err) {
    try { await db.exec('ROLLBACK'); } catch (_) {}
    throw err;
  }
}

module.exports = { getDb, withTransaction };
