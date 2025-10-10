const { db } = require('../db');
const {verifyPassword } = require('../services/passwordServices');
const { getPasswordByEmail , getIdByEmail} = require('./volunteerServices');

async function loginVolunteer(email, password) {
    let hashedPassword = getPasswordByEmail(email)
    let id = await getIdByEmail(email)
    if (await verifyPassword(hashedPassword, password)) {
        return { message: 'Login successful' };
    } else {
        return { error: 'Invalid email or password' };
    }
}

module.exports = { loginVolunteer };