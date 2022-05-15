const getConnection = require('../model/db')

module.exports = exports = {};


exports.getAllMenus = function() {
  return new Promise((resolve, reject)=> {
    getConnection().query('select * from menu;',[], function(err, data) {
      console.log('get_left_menus');
      if(err) {
        reject(err);
      }
      resolve(data);
    });
  });
}