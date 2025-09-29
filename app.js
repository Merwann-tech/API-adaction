const express = require('express')
const app = express()
const port = 5000

const { DatabaseSync } = require('node:sqlite');
const db = new DatabaseSync('./database.db');

let name = db.prepare(`SELECT name FROM test`)

app.get('/', (req, res) => {
  res.send(name.all())
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


// db.exec(`
// CREATE TABLE test (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     name TEXT NOT NULL
// );
// `);
// const insert = db.prepare('INSERT INTO test (name) VALUES (?)');
// // Execute the prepared statement with bound values.
// insert.run('margot');
// insert.run('elies');


