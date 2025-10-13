const { db } = require('../db');

function getMonthCollect(date){
  let month = db.prepare(`SELECT
    COALESCE(SUM(nb_butt),0) as nb_butt,
    COALESCE(SUM(nb_plastic),0) as nb_plastic,
    COALESCE(SUM(nb_glass),0) as nb_glass,
    COALESCE(SUM(nb_metal),0) as nb_metal,
    COALESCE(SUM(nb_electronic),0) as nb_electronic,
    COALESCE(SUM(nb_other),0) as nb_other
    FROM collect WHERE strftime('%Y-%m', date) = '${date}'; `)
    return month.all()
}

module.exports = {getMonthCollect};