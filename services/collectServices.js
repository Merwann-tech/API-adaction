const { db } = require('../db');

function addCollect(volunteer_id, date, city, nb_butt, nb_plastic, nb_glass, nb_metal, nb_electronic, nb_other) {
  db.exec(`INSERT INTO collect (volunteer_id,date,city_id,nb_butt,nb_plastic,nb_glass,nb_metal,nb_electronic,nb_other) 
    VALUES(
    ${volunteer_id},
    '${date}',
    (SELECT city_id FROM city WHERE name = '${city}'),
    ${nb_butt},
    ${nb_plastic},
    ${nb_glass},
    ${nb_metal},
    ${nb_electronic},
    ${nb_other}
    )`);
  addDonationPoint(volunteer_id, nb_butt, 1)
  addDonationPoint(volunteer_id, nb_plastic, 2)
  addDonationPoint(volunteer_id, nb_glass, 3)
  addDonationPoint(volunteer_id, nb_metal, 4)
  addDonationPoint(volunteer_id, nb_electronic, 5)
  addDonationPoint(volunteer_id, nb_other, 6)
}

function addDonationPoint(userID, nbWaste, wasteID) {
  let nbPoint = 0
  if (wasteID == 1) {
    nbPoint = nbWaste * 10
  } else if (wasteID == 2) {
    nbPoint = nbWaste * 30
  } else if (wasteID == 3) {
    nbPoint = nbWaste * 20
  } else if (wasteID == 4) {
    nbPoint = nbWaste * 15
  } else if (wasteID == 5) {
    nbPoint = nbWaste * 15
  } else if (wasteID == 6) {
    nbPoint = nbWaste * 5
  }
  db.exec(
    `UPDATE volunteer
    SET current_donation_point = current_donation_point + ${nbPoint}
    WHERE volunteers_id = ${userID}`
  )
  updateTotalPoint(userID)
}

function updateTotalPoint(userID) {
  db.exec(
    `UPDATE volunteer
    SET total_donation_point = current_donation_point + spend_donation_point
    WHERE volunteers_id = ${userID}`
  )
}

module.exports = { addCollect };