var express = require('express');
var router = express.Router();

router.get('/main', function(req, res) {
  console.log('sessionId in Main Page: ' + req.sessionID);
  console.log('session passport: ' + req.user);
  
  console.log('customData: ' + req.customdata);
  res.render('main', {
    session_id: req.customdata,
  });
})

module.exports = router;