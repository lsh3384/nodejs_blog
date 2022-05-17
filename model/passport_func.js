const getConnection = require('./db')

var exports = module.exports = {};

exports.pwCheck = function(id, pw) {
  return new Promise((resolve, reject)=> {
    getConnection().query('select count(*) as count from user where id=? and pw=HEX(AES_ENCRYPT(?,\'secret_key\'))',[id, pw], function(err, data) {
      console.log('pw_check');
      if(err) {
        reject(err);
      }
      
      let pwCheckResult = data[0].count;
      if (pwCheckResult == 1) {
        resolve(true);
      } else {
        console.log(data)
        resolve(false);
      }
    });
  });
}

exports.authCheck = function(id) {
  return new Promise((resolve, reject)=> {
    getConnection().query('select auth_cd from mnger where mnger_id=?',[id], function(err, data) {
      if(err) {
        reject(err);
      }
        console.log(data)
        resolve(data);
    });
  });
}