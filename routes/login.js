var express = require('express');
var router = express.Router();
var passport = require('../config/passport');
const {pw_check} = require('../model/passport_func')


router.get('/login', function(req, res, next) {
  res.render('login')
});

router.post('/login', async function(req, res, next) {
  console.log(req.body);
  console.log(req.sessionID);
  
  next();
  
}, passport.authenticate('local-login', {
  successRedirect : '/main',
  failureRedirect : '/login'
  }
));

router.get('/logout', function(req, res) {
  req.session.destroy();
  console.log(req.sessionID);
  res.clearCookie('session_id');
  res.render('main');
})

module.exports = router;