var express = require('express');
var router = express.Router();
const {checkId, registUser} = require('../model/regist');
const {getAllAuth} = require('../model/auth');


router.get('/regist', async function(req, res) {
  
  let auths = await getAllAuth();
  res.render('regist', {
    auths : auths
  });
})


router.post('/registAction', async function(req, res) {

  let id = req.body.id;
  let name = req.body.name;
  let password = req.body.password;
  let authCode = req.body.authCode;

  console.log(id);
  console.log(name);
  console.log(password);
  console.log(authCode);
  await registUser(id, name, password, authCode);
  
  
  res.redirect('/login');
})


router.post('/checkId', async function(req, res) {
  console.log('checkId');
  let id = req.body.id;
  console.log('id' + id);
  let checkIdResult = await checkId(id);

  console.log(checkIdResult);
  let responseData = {};
  if (checkIdResult === true) {
    console.log('true');
    responseData.checkId = 'ok';
    console.log(responseData);
    res.json(responseData);
  } else {
    responseData.idCheckResult = 'fail';
    res.json(responseData);
  }
})


module.exports = router;