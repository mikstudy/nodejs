Passport를 활용하여 Google OAuth 2.0 인증하기
=====

### 1. Google API
https://console.developers.google.com/apis 에 접속해서 새 프로젝트를 생성한다


### 2. 사용자 인증 정보 생성
-  화면 좌측 항목 중 `사용자 인증 정보` 클릭
-  `사용자 인증 정보 만들기` - `OAuth 클라이언트 ID`
-  `웹 어플리케이션` 선택 후 클라이언트 ID 만들기


> ** ex) 클라이언트 ID 만들기**
> - 이름 : test
> - 승인된 자바스크립트 원본 : http://localhost:5000
> - 승인된 리디렉션 URI : http://localhost:5000/auth/google/callback


### 3. 클라이언트 ID 획득
사용자 인증 정보 생성을 완료하면 `clientID` 와 `clientSecret` 키를 받을 수 있다.


### 4. 인증 페이지
```js
var express          = require( 'express' )
  , app              = express()
  , server           = require( 'http' ).createServer( app )
  , passport         = require( 'passport' )
  , util             = require( 'util' )
  , bodyParser       = require( 'body-parser' )
  , cookieParser     = require( 'cookie-parser' )
  , session          = require( 'express-session' )
  , RedisStore       = require( 'connect-redis' )( session )
  , GoogleStrategy   = require( 'passport-google-oauth2' ).Strategy;

var GOOGLE_CLIENT_ID      = "614436302821-aibj1b20894ke89hdu8895e1eou2u339.apps.googleusercontent.com"
  , GOOGLE_CLIENT_SECRET  = "mzMhLpAIPcPObortZm0Dwfgw";

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new GoogleStrategy({
    clientID:     GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      return done(null, profile);
    });
  }
));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use( express.static(__dirname + '/public'));
app.use( cookieParser());
app.use( bodyParser.json());
app.use( bodyParser.urlencoded({
	extended: true
}));
app.use( session({
	secret: 'cookie_secret',
	name:   'kaas',
	store:  new RedisStore({
		host: '127.0.0.1',
		port: 6379
	}),
	proxy:  true,
    resave: true,
    saveUninitialized: true
}));
app.use( passport.initialize());
app.use( passport.session());

app.get('/', function(req, res){
  res.render('index', { user: req.user });
});

app.get('/account', ensureAuthenticated, function(req, res){
  res.render('account', { user: req.user });
});

app.get('/login', function(req, res){
  res.render('login', { user: req.user });
});

app.get('/auth/google', passport.authenticate('google', { scope: [
       'https://www.googleapis.com/auth/plus.login',
       'https://www.googleapis.com/auth/plus.profile.emails.read']
}));

app.get( '/auth/google/callback',
    	passport.authenticate( 'google', {
    		successRedirect: '/',
    		failureRedirect: '/login'
}));

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

server.listen( 5000 );

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}

```

