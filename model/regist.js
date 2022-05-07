const getConnection = require('./db')

var exports = module.exports = {};

exports.mnger_regist = function(id, nm, pw, auth_cd) {
  return new Promise((resolve, reject) => {
    getConnection().query('insert into mnger(mnger_id, mnger_nm, mnger_pw, AUTH_CD) values(?, ?, HEX( AES_ENCRYPT(?,\'secret_key\') ), ?);', [id, nm, pw, auth_cd], function(err, data) {
      if(err) {
        console.log(err);
        reject(err);
      } 
        console.log(data);
        resolve(data);
    });
  });
}

exports.id_check = function(id) {
  return new Promise((resolve, reject) => {
    getConnection().query('select count(*) as count from mnger where mnger_id = ?', [id], function(err, data) {
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