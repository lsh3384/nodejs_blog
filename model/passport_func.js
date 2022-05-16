const getConnection = require('./db')

var exports = module.exports = {};

exports.pwCheck = function(mnger_id, mnger_pw) {
  return new Promise((resolve, reject)=> {
    getConnection().query('select count(*) as count from mnger where mnger_id=? and mnger_pw=HEX(AES_ENCRYPT(?,\'secret_key\'))',[mnger_id, mnger_pw], function(err, data) {
      console.log('pw_check');
      if(err) {
        reject(err);
      }
      
      let pw_check_result = data[0].count;
      if (pw_check_result == 1) {
        resolve(true);
      } else {
        console.log(data)
        resolve(false);
      }
    });
  });
}

exports.authCheck = function(mnger_id) {
  return new Promise((resolve, reject)=> {
    getConnection().query('select auth_cd from mnger where mnger_id=?',[mnger_id], function(err, data) {
      if(err) {
        reject(err);
      }
        console.log(data)
        resolve(data);
    });
  });
}