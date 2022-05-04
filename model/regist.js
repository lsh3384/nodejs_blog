const getConnection = require('./db')

var exports = module.exports = {};

exports.mnger_regist = function(id, nm, pw) {
  return new Promise((resolve, reject) => {
    getConnection().query('insert into mnger(mnger_id, mnger_nm, mnger_pw) values(?, ?, HEX( AES_ENCRYPT(?,\'secret_key\') ));', [id, nm, pw], function(err, data) {
      if(err) {
        console.log(err);
        reject(err);
      } 
        console.log(data);
        resolve(data);
    });
  });
}