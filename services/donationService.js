const { withTransaction, getDb } = require('../db');

async function donate(volunteerId, associationId) {
  return withTransaction(async (db) => {
    const association = await db.get(
      'SELECT donation_value FROM association WHERE association_id = ?',
      associationId
    );
    if (!association) {
      const e = new Error('Association introuvable');
      e.statusCode = 404;
      throw e;
    }

    const volunteer = await db.get(
      'SELECT current_donation_point AS current FROM volunteer WHERE volunteers_id = ?',
      volunteerId
    );
    if (!volunteer) {
      const e = new Error('Bénévole introuvable');
      e.statusCode = 404;
      throw e;
    }

    const donation = association.donation_value;
    if (volunteer.current < donation) {
      const e = new Error('Solde insuffisant');
      e.statusCode = 400;
      throw e;
    }

    await db.run(
      `UPDATE volunteer
       SET current_donation_point = current_donation_point - ?,
           spend_donation_point   = spend_donation_point   + ?
       WHERE volunteers_id = ?`,
      donation, donation, volunteerId
    );

    await db.run(
      `UPDATE association
       SET total_donation = total_donation + ?
       WHERE association_id = ?`,
      donation, associationId
    );

    await db.run(
      `UPDATE volunteer
       SET total_donation_point = current_donation_point + spend_donation_point
       WHERE volunteers_id = ?`,
      volunteerId
    );

    return { donation };
  });
}

module.exports = { donate };
