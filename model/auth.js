const getConnection = require('./db')

var exports = module.exports = {};

exports.checkAuth = function(id) {
  return new Promise((resolve, reject)=> {
    getConnection().query('select auth_code from user where id=?',[id], function(err, data) {
      console.log('checkAuth');
      if(err) {
        reject(err);
      }

      let authCode = data[0].authCode;
      resolve(authCode);
    });
  });
}

exports.getAllAuth = function(){
  return new Promise((resolve, reject)=> {
    getConnection().query('select * from auth', function(err, data) {
      console.log('getAllAuth');
      if(err) {
        reject(err);
      }
      
      let authCode = data;
      resolve(authCode);
    });
  });
}