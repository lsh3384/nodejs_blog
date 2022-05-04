var mysql = require('mysql');

//mysql db 연결 함수
var pool = mysql.createPool({
  connectionLimit: 100,
  host: '127.0.0.1',
  user: 'aiot',
  database: 'aiot',
  password: 'u00000000'
})

//디비 연결 함수
function getConnection() {
  return pool
}

module.exports = getConnection;