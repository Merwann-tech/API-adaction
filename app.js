const express = require('express')
const app = express()
const port = 3000

const { DatabaseSync } = require('node:sqlite');
const db = new DatabaseSync('./database.db');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));




app.get('/', (req, res) => {
  let name = db.prepare(`SELECT * FROM volunteer`)
  res.send(name.all())
})

app.get('/association', (req, res) => {
  try {
    const stmt = db.prepare(`SELECT * FROM association`);
    const associations = stmt.all();
    res.status(200).json(associations);
  } catch (error) {
    res.status(500).json({ erreur: error.message });
  }
})

app.get('/volunteer/point/:id', (req, res) => {

    const volunteerId = Number(req.params.id);
    const stmt = db.prepare(`
      SELECT volunteers_id AS id,
             current_donation_point AS current,
             spend_donation_point AS spend,
             total_donation_point AS total
      FROM volunteer
      WHERE volunteers_id = ?
    `);

    const row = stmt.get(volunteerId);
    res.status(200).json(row);
});

app.post('/collect', (req, res) => {
  res.status(201).json({ status: "collect ajouté" });
  // console.log(req.body.volunteer_id);
  const insert = db.prepare('INSERT INTO collect (volunteer_id,date,city_id,nb_butt,nb_plastic,nb_glass,nb_metal,nb_electronic,nb_other) VALUES(?,?,?,?,?,?,?,?,?)');
  insert.run(
    req.body.volunteer_id,
    req.body.date,
    req.body.city_id,
    req.body.nb_butt,
    req.body.nb_plastic,
    req.body.nb_glass,
    req.body.nb_metal,
    req.body.nb_electronic,
    req.body.nb_other);

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


