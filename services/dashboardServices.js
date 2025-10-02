const { db } = require('../db');

function getMonthCollect(date){
  let month = db.prepare(`SELECT
    SUM(nb_butt) as nb_butt,
    SUM(nb_plastic) as nb_plastic,
    SUM(nb_glass) as nb_glass,
    SUM(nb_metal) as nb_metal,
    SUM(nb_electronic) as nb_electronic,
    SUM(nb_other) as nb_other
    FROM collect WHERE strftime('%Y-%m', date) = '${date}'; `)
    return month.all()
}

module.exports = {getMonthCollect};