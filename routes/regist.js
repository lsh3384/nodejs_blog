var express = require('express');
var router = express.Router();
const {id_check, mnger_regist} = require('../model/regist');
const {auth_select} = require('../model/auth_check');


router.get('/regist', async function(req, res) {
  
  let auths = await auth_select();
  res.render('regist', {
    auths : auths
  });
})


router.post('/regist_action', async function(req, res) {

  let mnger_id = req.body.mnger_id;
  let mnger_nm = req.body.mnger_nm;
  let mnger_pw = req.body.mnger_pw;
  let auth_cd = req.body.auth_cd;

  console.log(mnger_id);
  console.log(mnger_nm);
  console.log(mnger_pw);
  console.log(auth_cd);
  await mnger_regist(mnger_id, mnger_nm, mnger_pw, auth_cd);
  
  
  res.redirect('/login');
})


router.post('/id_check', async function(req, res) {
  console.log('id_check');
  let mnger_id = req.body.mnger_id;
  console.log('mnger_id' + mnger_id);
  let id_check_result = await id_check(mnger_id);

  console.log(id_check_result);
  let responseData = {};
  if (id_check_result === true) {
    console.log('true');
    responseData.id_check = 'ok';
    console.log(responseData);
    res.json(responseData);
  } else {
    responseData.id_check = 'fail';
    res.json(responseData);
  }
})


module.exports = router;