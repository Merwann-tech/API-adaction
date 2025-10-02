const { db } = require('../db');

function getDonationPoint(associationID){
  let point = db.prepare(`SELECT donation_value FROM association WHERE association_id = ${associationID}`)
  return point.get().donation_value
}

function donationUpdate(volunteerID,associationID){
 let donation = getDonationPoint(associationID);
  db.exec(`
    UPDATE volunteer 
    SET current_donation_point = current_donation_point - ${donation},
    spend_donation_point = spend_donation_point + ${donation}
    WHERE volunteers_id = ${volunteerID}`)
  db.exec(`
    UPDATE association
    SET total_donation = total_donation + ${donation}
    WHERE association_id = ${associationID}`)
};

module.exports = {donationUpdate};