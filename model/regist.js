const getConnection = require('./db')

var exports = module.exports = {};

exports.registUser = function(id, name, password, authCode) {
  return new Promise((resolve, reject) => {
    getConnection().query('insert into user(id, name, password, auth_code) values(?, ?, HEX( AES_ENCRYPT(?,\'secret_key\') ), ?);', [id, name, password, authCode], function(err, data) {
      if(err) {
        console.log(err);
        reject(err);
      } 
        console.log(data);
        resolve(data);
    });
  });
}

exports.checkId = function(id) {
  return new Promise((resolve, reject) => {
    getConnection().query('select count(*) as count from user where id = ?', [id], function(err, data) {
      if(err) {
        console.log(err);
        reject(err);
      }
      let id_count = data[0].count;
      console.log('id_count: ' + id_count)
      if (id_count >= 1) {
        resolve(false);
      } else {
        resolve(true);
      }
    })
  })
}