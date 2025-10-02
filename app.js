const express = require('express')
const app = express()
const port = 3000

const { db } = require('./db');

const routes = require('./routes')
app.use('/', routes)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/donate', (req, res) => {
    res.status(201).json({ status: "donation effectuée." });
  let donation = getDonationPoint(req.body.association_id);
  db.exec(`
    UPDATE volunteer 
    SET current_donation_point = current_donation_point - ${donation},
    spend_donation_point = spend_donation_point + ${donation}
    WHERE volunteers_id = ${req.body.volunteer_id}`)
  db.exec(`
    UPDATE association
    SET total_donation = total_donation + ${donation}
    WHERE association_id = ${req.body.association_id}`)
});

function getDonationPoint(associationID){
  let point = db.prepare(`SELECT donation_value FROM association WHERE association_id = ${associationID}`)
  return point.get().donation_value
}




app.get('/dashboard/:date', (req, res) => {
  let date = req.params.date
  let month = db.prepare(`SELECT
    SUM(nb_butt) as nb_butt,
    SUM(nb_plastic) as nb_plastic,
    SUM(nb_glass) as nb_glass,
    SUM(nb_metal) as nb_metal,
    SUM(nb_electronic) as nb_electronic,
    SUM(nb_other) as nb_other
    FROM collect WHERE strftime('%Y-%m', date) = '${date}'; `)
  res.send(month.all())
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


app.post('/collect', (req, res) => {
  res.status(201).json({ status: "collect ajouté" });
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

  addDonationPoint(req.body.volunteer_id,req.body.nb_butt,1)
  addDonationPoint(req.body.volunteer_id,req.body.nb_plastic,2)
  addDonationPoint(req.body.volunteer_id,req.body.nb_glass,3)
  addDonationPoint(req.body.volunteer_id,req.body.nb_metal,4)
  addDonationPoint(req.body.volunteer_id,req.body.nb_electronic,5)
  addDonationPoint(req.body.volunteer_id,req.body.nb_other,6)
})



function addDonationPoint(userID,nbWaste,wasteID){
  let nbPoint = 0
  if (wasteID == 1){
    nbPoint = nbWaste * 10
  }else if(wasteID == 2){
    nbPoint = nbWaste * 30 
  }else if(wasteID == 3){
    nbPoint = nbWaste * 20 
  }else if(wasteID == 4){
    nbPoint = nbWaste * 15 
  }else if(wasteID == 5){
    nbPoint = nbWaste * 15 
  }else if(wasteID == 6){
    nbPoint = nbWaste * 5 
  }
  db.exec(
    `UPDATE volunteer
    SET current_donation_point = current_donation_point + ${nbPoint}
    WHERE volunteers_id = ${userID}`
  )
  updateTotalPoint(userID)
}

function updateTotalPoint(userID){
  db.exec(
    `UPDATE volunteer
    SET total_donation_point = current_donation_point + spend_donation_point
    WHERE volunteers_id = ${userID}`
  )
}


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})