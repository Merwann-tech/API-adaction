const { db } = require('../db');


function getLeaderboard() {
    const leaderboard = db.prepare(`SELECT 
    v.volunteers_id,
    v.firstname,
    v.lastname,
    COUNT(c.collect_id) as collect
    FROM volunteer AS v
    JOIN collect AS c
    ON v.volunteers_id = c.volunteer_id
    GROUP BY v.volunteers_id
    ORDER BY collect DESC;`);
    return leaderboard.all();
}

module.exports = {
    getLeaderboard,
};