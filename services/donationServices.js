const { db } = require('../db');

function getDonationPoint(associationID) {
  let point = db.prepare(`SELECT donation_value FROM association WHERE association_id = ${associationID}`)
  return point.get().donation_value
}

function donationUpdate(volunteerID, associationID) {
  let donation = getDonationPoint(associationID);
  const volunteer = db.prepare(`
    SELECT current_donation_point 
    FROM volunteer 
    WHERE volunteers_id = ?
  `).get(volunteerID);

  if (volunteer.current_donation_point < donation) {
    return { error: "Not enough points" };
  } else {
    db.exec(`
    UPDATE volunteer 
    SET current_donation_point = current_donation_point - ${donation},
    spend_donation_point = spend_donation_point + ${donation}
    WHERE volunteers_id = ${volunteerID}`)
    db.exec(`
    UPDATE association
    SET total_donation = total_donation + ${donation}
    WHERE association_id = ${associationID}`)
    return { success: "Donation successful "}
  }
};

module.exports = { donationUpdate };