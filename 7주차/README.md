Node.js 어플리케이션을 Heroku에 배포하기
=====

### 1. Heroku?
[Heroku](https://www.heroku.com/)는 구글 앱 엔진(Google App Engine, 이하 GAE)과 유사한 PaaS 서비스. GAE처럼 호스팅 및 DB 서비스(일반적인 RDBMS라기보단 Big Table이라는 접근제한적인 DB를 제공함.). GAE는 Java, Python을 지원하고 `Heroku`는 Python, Java 뿐만 아니라 Node.js, PHP, Scalar, Go 등을 지원한다. 그리고 한 계정당 `5개`의 웹사이트 무료 호스팅을 지원한다.

### 2. Heroku 가입
https://www.heroku.com/ 에서 가입한다. 가입을 하고 나면 가입 된 메일로 인증 메일이 발송 된다. 인증 메일을 통해 비밀번호를 설정하자.

### 3. Heroku 설치
https://devcenter.heroku.com/start 로 이동하여 `node.js` 항목으로 이동한다. `Set up` 탭으로 이동하여 `Heroku Toolbelt(Heroku CLI + Add-ons)`를 다운 받아서 설치하자. (`git`가 설치되어 있다면 `Custom Installation`을 선택하여 제외시키도록 한다.)

### 4. Heroku 로그인
`Heroku Toolbet`이 설치되었다면 커맨드 라인에서 `Heroku`로 로그인 해보자.
```bash
$ heroku login

Enter your Heroku credentials.
Email: abc@gmail.com
Password (typing will be hidden):
Logged in as abc@gmail.com
```

### 5. 샘플 어플리케이션 배포
아래 명령어를 입력하여 `heroku`에서 제공하는 샘플 어플리케이션 소스를 다운로드 받는다.
```bash
$ git clone https://github.com/heroku/node-js-getting-started.git
$ cd node-js-getting-started
```

`heroku`에 어플리케이션을 생성한다. 아래 명령어를 입력하면 내 계정 밑에 어플리케이션이 생성 되며, git 저장소도 만들어진다.
```bash
$ heroku create

Creating app... done, secure-hamlet-67178
https://secure-hamlet-67178.herokuapp.com/ | https://git.heroku.com/secure-hamlet-67178.git
```

https://dashboard.heroku.com/apps 에 접속하면 생성 된 어플리케이션이 보일 것이다. 어플리케이션 이름을 할당하지 않으면, 랜덤으로 정해지나 설정에서 변경 할 수 있다. (이름은 heroku 내에서 유일해야 한다.) 이제 소스 코드를 업로드 해보자.
```bash
$ git push heroku master
```

소스 코드를 업로드하면 원격 저장소에서 package.json 파일을 읽어서 의존성을 가진 모듈을 자동으로 설치해준다.

#### 6. 배포 확인
배포 된 앱이 프로세스로 살아 있는지 확인하는 방법은 다음과 같다.
```bash
$ heroku ps
```

이제 어플리케이션 생성 당시 할당 받았던 주소로 접속해보자. (https://secure-hamlet-67178.herokuapp.com/)

### 6. 앱 로그 확인
```bash
$ heroku logs --tail
```

### 7. 로컬에서 개발
개발을 해야하니 로컬에서도 개발 할 수 있도록 프로젝트 환경을 구성해보자.
```bash
$ npm install
$ heroku local web
```

### 8. 소스 변경 사항을 푸시하기(Push)
테스트로 소스를 업데이트하여 서버에 반영해보자. `Heroku`의 장점은 변경 된 소스가 서버에 반영되면 즉시, 자동으로 빌드가 된다는 점이다.
```bash
$ npm install --save --save-exact cool-ascii-faces

cool-ascii-faces@1.3.3 node_modules/cool-ascii-faces
└── stream-spigot@3.0.5 (xtend@4.0.1, readable-stream@1.1.13)
```

프로젝트 내의 `index.js`에 아래와 같이 `cool-ascii-faces` 모듈을 로드하고, `/cool` 라우트를 추가해보자.
```javascript
var cool = require('cool-ascii-faces');

...

app.get('/cool', function(request, response) {
  response.send(cool());
});
```

아래 명령어로 로컬에서 일단 테스트 해보자
```bash
$ heroku local web

http://localhost:5000/cool 접속
```

소스를 서버로 반영하자.
```bash
$ git add .
$ git commit -m "Demo"
$ git push heroku master
$ heroku open cool
```

### 9. 애드온 활용
`heroku`에선 각종 써드파티 라이브러리들을 좀 더 쉽게 사용하기 위해 `add-on` 형태로 제공한다. (애드온 마켓: https://elements.heroku.com/addons)
애드온은 다음과 같은 방법으로 어플리케이션 내에 설치한다.
```bash
$ heroku addons:create <ADD_ON_NAME>
```

### 10. DB 사용
예제로 PostgreSQL을 설치해보자.
```bash
$ heroku addons:create heroku-postgresql:hobby-dev

Creating heroku-postgresql:hobby-dev on secure-hamlet-67178... free
Created postgresql-asymmetrical-97215 as DATABASE_URL
Database has been created and is available
 ! This database is empty. If upgrading, you can transfer
 ! data from another database with pg:copy
Use heroku addons:docs heroku-postgresql to view documentation
```

데이터베이스가 설치되면 다음 명령어로 `DATABASE_URL` 환경 변수의 값을 확인 할 수 있다.
```bash
heroku config
```

`npm install pg --save` 명령어로 `pg` 모듈을 설치한다. 그리고 `index.js`에 아래 코드를 추가하자.
`/db`로 접속하면 `test_table`의 모든 row를 읽어서 보여주는 코드이다.
```javascript
var pg = require('pg');

app.get('/db', function (request, response) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('SELECT * FROM test_table', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { response.render('pages/db', {results: result.rows} ); }
    });
  });
});
```

### 11. DB 접속을 위한 pgAdmin 설치
https://www.pgadmin.org/download/ 로 접속하여 pgAdmin을 설치한다. https://postgres.heroku.com/databases/ 페이지에서 DB 접속 정보를 확인하여 DB에 접속해보자.
참고 링크: http://agileforce.co.uk/heroku-workshop/heroku-postgres/pgadmin.html

### 12. 샘플 DB 테이블 생성
아래 SQL을 입력 한 다음 `/db`로 접속해보자.
```sql
create table test_table (id integer, name text);
insert into test_table values (1, 'hello database');
```

### 13. Heroku Dataclips
`heroku`에선 [DataClip](https://dataclips.heroku.com/clips)이라는 웹페이지를 제공하는데, 여기서 DB로 바로 쿼리를 실행 할 수 있고, 쿼리를 저장 할 수도 있다. 다만 `Dataclips`는 insert나 update 등의 수정 쿼리는 실행 할 수 없고, 결과를 볼 수 있는 select 쿼리만 허용한다.

