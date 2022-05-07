const getConnection = require('../model/db')

module.exports = exports = {};



exports.get_left_menus = function(auth_cd) {
  return new Promise((resolve, reject)=> {
    var auth_cd_sql = '%' + auth_cd + '%';
    getConnection().query('select * from menu_mng where menu_use_auth like ?',[auth_cd_sql], function(err, data) {
      console.log('get_left_menus');
      if(err) {
        reject(err);
      }
      resolve(data);
    });
  });
}