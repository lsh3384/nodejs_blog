var session = require('express-session');
var MySQLStore = require("express-mysql-session")(session);

const getConnection = require('./model/db')
const connection = getConnection();
let express_mysql_seesion_options = {
  clearExpired: true,
  expiration: 60 * 60 * 1000,
  checkExpirationInterval: 10 * 1000,
}
var sessionStore = new MySQLStore(express_mysql_seesion_options, connection);


const express = require('express');
const app = express();                  // 클라이언트와 통신

app.use(
  session({
    key: "session_id_test",  // 쿠키에 나타날 이름을 정해줄 수 있다.
    secret: "session_cookie_secret",
    store: sessionStore,    // 위에서 설정한 express-mysql-session으로 mysql에 저장하겠다는 것을 나타냄
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 60 * 1000 },  //브라우저에서 쿠키의 expiration 시간을 정함.
  })
);


// req.body객체를 파싱하는 기능
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())


app.set('view engine', 'ejs');
// app.use(session({secret:'MySecret', resave:true, saveUninitialized:true}));

// Passport
var passport = require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());

// Custom Middlewares
// app.use(function(req,res,next){
//   res.locals.isAuthenticated = req.isAuthenticated();
//   res.locals.currentUser = req.user;
//   next();
// });


const path = require('path');
app.use(express.static(path.join(__dirname, '/www')));


/* router 추가 */
app.use(require('./routes/main'));
app.use(require('./routes/login'));
app.use(require('./routes/regist'));


// Port setting
var port = 9090;
app.listen(port, function(){
  console.log('server on! http://localhost:'+port);
});