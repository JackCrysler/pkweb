var mysql = require('mysql');
const db_cfg = require('./db')
var pool = mysql.createPool(db_cfg);
let mysqlp = (querystr) => {
    return new Promise((resolve, reject) => {
        pool.query(querystr, (err, results, fields) => {
            if (err) {
                reject(err)
            } else {
                resolve(results, fields)
            }
        })
    })}
module.exports = {
    setMysqlWithKoa:(app) => {
        //直接将mysql挂到app的context上  ctx源于context
        app.context.mysql = mysqlp
    },
    mysqlp
}