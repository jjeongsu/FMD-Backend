const mysql = require('mysql2/promise')

const pool = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'MySQL2023',
  database: 'FMD_test',
  connectionLimit: 10
})

module.exports = pool

/**
 * MySQL이랑 연결하는 모듈
 */