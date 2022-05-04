var mysql = require('mysql');

//mysql db 연결 함수
var pool = mysql.createPool({
  connectionLimit: 100,
  host: '',
  user: '',
  database: '',
  password: ''
})

//디비 연결 함수
function getConnection() {
  return pool
}

module.exports = getConnection;