const mysql = require('mysql');
var session = require('express-session');
var MySQLStore = require("express-mysql-session")(session);
var options = {
  host: '127.0.0.1',
  port: 3306,
  user: 'aiot',
  database: 'aiot',
  password: 'u00000000'
};
var connection = mysql.createConnection(options);
var sessionStore = new MySQLStore({}, connection);


const express = require('express');
const app = express();                  // 클라이언트와 통신

app.use(
  session({
    key: "session_id",
    secret: "session_cookie_secret",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
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