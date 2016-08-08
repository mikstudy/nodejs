5주차 스터디
=====

## 1. Passport
 - node.js용 범용 인증 모듈로서 기본적인 HTTP Basic Auth에서 부터 HTTP digest authentication, OAuth,OpenID 등 다양한 인증 프로토콜을 지원한다.
 - Facebook이나 Twitter,Google등과의 연계된 SSO 인증을 포함하여 약 300가지의 인증 모듈을 포함한다.

  #### Passport를 통해 로컬인증 구현하기

 ```js
 // passport :
// https://www.npmjs.com/package/passport
// http://passportjs.org/

var express = require('express');
var passport = require('passport');
var strategy = require('passport-local').Strategy;
var cookieParser = require('cookie-parser');
var path = require('path');


// passport에서 다양한 인증에 대해 미리 구현해 놓은 것을 Strategy라 칭한다.
// ex) Facebook -> Facebook Strategy
passport.use(new strategy(
  {
    // 별도로 정의하지 않을 경우 Default 값으로 username, password 필드를 사용한다.
    // passReqToCallback은 인증을 수행하는 인증 함수로, HTTP request를 파라메터로 전달할지 여부를 결정한다.
    usernameField : 'username',
    passwordField : 'password',
    passReqToCallback : true
  },
  function(req, username, password, cb) { // HTTP request, username, password, callback
    if (username == 'test' && password == '1234') {
      var user = {
         'id' : 'simu'
        ,'email' : 'simu@miksystem.com'
      }
      return cb(null, user); // 인증 성공, HTTP Session에 저장된다
    }
    else {
      return cb(null, false); // 인증 실패
    }
  }));

// 로그인 성공 시 serializeUser메서드를 사용하여 사용자 정보를 Session에 저장할 수 있다.
// 아래 user파라메터는 Strategy 객체의 인증함수에서 cb(null, user); 로 넘어온 값이다.
passport.serializeUser(function(user, cb) {
  cb(null, user); // session에 저장할 정보를 두번째 인자로 넘긴다.
});

// 로그인이 되어 있을 경우 모든 사용자 페이지에 접근할 경우 deserializeUser가 발생한다.
// deserializeUser메서드의 첫 번째 인자 user는 session에 저장된 사용자 정보이다.
// 아래와 같이 session에서 읽은 내용을 리턴하면 HTTP request에 'req.user'형식으로 다른 페이지에서 사용할 수 있다.
passport.deserializeUser(function(user, cb) {
    cb(null, user);
});

// session에 사용자 정보를 저장하고자 할 경우, 사용자 정보가 크다면 메모리가 많이 소모되기 때문에
// serializeUser에서 id같은 키값만 저장하고 페이지 접근 시 deserializeUser에서 해당 키값으로
// 사용자 정보를 select 해서 HTTP request로 리턴하는 형식을 많이 사용한다.


// express 객체 생성
var app = express();

// passport 초기화 및 세션 사용 설정
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
// views 폴더 사용
app.use(express.static(path.join(__dirname, 'views')));

// post 요청 데이터를 추출하는 미들웨어. request 객체에 body 속성이 부여된다.
app.use(require('body-parser').urlencoded({ extended: true }));


// Define routes.
app.get('/',
  function(req, res) {
    res.redirect('/home.html');
  });

app.get('/login',
  function(req, res){
    res.redirect('login.html');
  });

// /login으로 들어오는 요청에 대해서 사용자 인증을 처리하도록 passport.authenticate을 미들웨어 형태로 추가
// authenticate메서드를 정의함으로써 인증 메서드를 호출 할 수 있다.
app.post('/login',
  passport.authenticate('local', { failureRedirect: '/login_fail' }),
  function(req, res) {
    //res.redirect('/login_success');
    res.setHeader('Set-Cookie', 'hello=1, world=2');
    res.send(req.user);
    console.log('session : ', req.session.passport.user)
  });

app.get('/login_fail',
  function(req, res){
    res.send('login_fail');
  });

app.get('/login_success',
  function(req, res){
    res.send('login_success');
  });


app.listen(3000);

  ```
 <br><br>
