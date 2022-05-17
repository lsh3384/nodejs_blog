const getConnection = require('./db')

var exports = module.exports = {};

exports.checkPassword = function(id, password) {
  return new Promise((resolve, reject)=> {
    getConnection().query('select count(*) as count from user where id=? and password=HEX(AES_ENCRYPT(?,\'secret_key\'))',[id, password], function(err, data) {
      console.log('pw_check');
      if(err) {
        reject(err);
      }
      console.log(data);
      let pwCheckResult = data[0].count;
      if (pwCheckResult === 1) {
        resolve(true);
      } else {
        console.log(data)
        resolve(false);
      }
    });
  });
}

exports.checkAuth = function(id) {
  return new Promise((resolve, reject)=> {
    getConnection().query('select auth_code from user where id=?',[id], function(err, data) {
      if(err) {
        reject(err);
      }
        console.log(data)
        resolve(data);
    });
  });
}