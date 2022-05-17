const getConnection = require('./db')

var exports = module.exports = {};

exports.authCheck = function(id) {
  return new Promise((resolve, reject)=> {
    getConnection().query('select auth_cd from mnger where mnger_id=?',[id], function(err, data) {
      console.log('authCheck');
      if(err) {
        reject(err);
      }

      let authCode = data[0].authCode;
      resolve(authCode);
    });
  });
}

exports.authSelect = function(){
  return new Promise((resolve, reject)=> {
    getConnection().query('select * from auth_cd_mng', function(err, data) {
      console.log('auth_cd_select');
      if(err) {
        reject(err);
      }
      
      let authCode = data;
      resolve(authCode);
    });
  });
}