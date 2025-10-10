const { db } = require('../db');
const {verifyPassword } = require('../services/passwordServices');
const { getPasswordByEmail , getIdByEmail} = require('./volunteerServices');
const {createToken}= require('./tokenServices');

async function loginVolunteer(email, password) {
    let hashedPassword = getPasswordByEmail(email)
    if (await verifyPassword(hashedPassword, password)) {
        let id = await getIdByEmail(email)
        let jsonid = { id : id}
        let token = createToken(jsonid)
        return { 
            message: 'Login successful',
            token : token
         };
    } else {
        return { error: 'Invalid email or password' };
    }
}

module.exports = { loginVolunteer };