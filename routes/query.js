var express = require('express');
var router = express.Router();

const mysql = require('mysql');
const util = require('util');
var conn = mysql.createConnection({
  host     : process.env.MYSQL_HOST || 'localhost',
  user     : 'root',
  password : process.env.MYSQL_PWD,
  database : process.env.MYSQL_TABLE_NAME || null,
  port: process.env.MYSQL_PORT || '3306'
});
 
conn.connect();

const query = util.promisify(conn.query).bind(conn);

/* GET users listing. */
router.post('/', async function(req, res, next) {
  
  try{
    const rows = await query(req.body.query);
    console.log(req.body.query);
    res.send(rows);
  } catch (error) {
    res.send({
      time: new Date().toLocaleString(),
      message: "mysql指令發生錯誤",
      error: error.message,
    })
  }

});

module.exports = router;
