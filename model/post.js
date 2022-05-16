const getConnection = require('../model/db')

module.exports = exports = {};


exports.getAllPosts = function() {
  return new Promise((resolve, reject)=> {
    getConnection().query('select *, date_format(rgs_date, "%Y-%m-%d %T") as rgs_date from post;',[], function(err, data) {
      console.log('getAllPosts');
      if(err) {
        reject(err);
      }
      resolve(data);
    });
  });
}