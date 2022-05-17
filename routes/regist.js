var express = require('express');
var router = express.Router();
const {idCheck, registUser} = require('../model/regist');
const {selectAuth} = require('../model/auth_check');


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


router.post('/idCheck', async function(req, res) {
  console.log('idCheck');
  let id = req.body.id;
  console.log('id' + id);
  let idCheckResult = await idCheck(id);

  console.log(idCheckResult);
  let responseData = {};
  if (idCheckResult === true) {
    console.log('true');
    responseData.idCheck = 'ok';
    console.log(responseData);
    res.json(responseData);
  } else {
    responseData.idCheckResult = 'fail';
    res.json(responseData);
  }
})


module.exports = router;