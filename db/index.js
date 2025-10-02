const { DatabaseSync } = require('node:sqlite');
const db = new DatabaseSync('./database.db');

module.exports = { db };