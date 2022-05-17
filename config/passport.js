const {pwCheck, autCheck} = require('../model/passport_func');

const req = require('express/lib/request');
var passport = require('passport');
// serialize & deserialize User
// 처음 로그인할 때만 실행하여 sessionID 저장
passport.serializeUser(async function(user, done) {
  console.log('serializeUser');
  console.log('user', user);

  // service
  let result = await authCheck(user.id);
  console.log('auth check result:' + result[0].auth_cd);
  
  done(null, user.id);
});


// 매번 접속할 때마다 실행하여 sessionID확인
passport.deserializeUser(function(id, done) {
  console.log(id)
  console.log('deserializeUser');
  done(null, id);
});


// local strategy
var LocalStrategy = require('passport-local').Strategy;
passport.use('local-login',
  new LocalStrategy({
      usernameField : 'id',   // post요청으로 id로 받은 파라미터를 req.body 객체에 해당 이름으로 추가해서 사용할 수 있도록 해줌
      passwordField : 'pw',   // post요청으로 id로 받은 파라미터를 req.body 객체에 해당 이름으로 추가해서 사용할 수 있도록 해줌
      passReqToCallback : true,
      session: true
    },
    async function(req, username, password, done) {
      console.log('passport');
      let id = req.body.id;
      let pw = req.body.pw;
      let pw_check_result = await pwCheck(id, pw);
      
      if(pw_check_result === true) {
        return done(null, {
          id: id
        });
      } else {
        return done(null, false); 
      }
    }
  )
);

module.exports = passport;