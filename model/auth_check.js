const getConnection = require('./db')

var exports = module.exports = {};

exports.auth_check = function(mnger_id) {
  return new Promise((resolve, reject)=> {
    getConnection().query('select auth_cd from mnger where mnger_id=?',[mnger_id], function(err, data) {
      console.log('auth_check');
      if(err) {
        reject(err);
      }
      
      let auth_cd = data[0].auth_cd;
      resolve(auth_cd);
    });
  });
}

exports.auth_select = function(){
  return new Promise((resolve, reject)=> {
    getConnection().query('select * from auth_cd_mng', function(err, data) {
      console.log('auth_cd_select');
      if(err) {
        reject(err);
      }
      
      let auth_cd_select = data;
      resolve(auth_cd_select);
    });
  });
}