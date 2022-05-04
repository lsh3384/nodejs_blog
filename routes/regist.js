var express = require('express');
var router = express.Router();
const {mnger_regist} = require('../model/regist')

router.get('/regist', function(req, res) {
  res.render('regist');
})


router.post('/regist_action', async function(req, res) {
  

  let mnger_id = req.body.mnger_id;
  let mnger_nm = req.body.mnger_nm;
  let mnger_pw = req.body.mnger_pw;
  
  console.log(mnger_id);
  console.log(mnger_nm);
  console.log(mnger_pw);
  await mnger_regist(mnger_id, mnger_nm, mnger_pw);
  console.log('after')
  // res.redirect('/regist');
  res.render('regist', {
    auth_cd: 'super',
    sessionId: 'sessionid'
  });
})


module.exports = router;