const getConnection = require('../model/db')

module.exports = exports = {};


exports.getLeftMenusForUsers = function() {
  return new Promise((resolve, reject)=> {
    getConnection().query('select * from menu where manager_yn="n" order by cd;',[], function(err, data) {
      console.log('get_left_menus');
      if(err) {
        reject(err);
      }
      console.log(data);
      resolve(data);
    });
  });
}


exports.getLeftMenusForManager = function() {
  return new Promise((resolve, reject)=> {
    getConnection().query('select * from menu order by cd;',[], function(err, data) {
      console.log('get_left_menus');
      if(err) {
        reject(err);
      }
      console.log(data);
      resolve(data);
    });
  });
}