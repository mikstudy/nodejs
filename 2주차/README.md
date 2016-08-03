2주차 스터디
=====

## 1. 웹 서버 만들기
 - Node.js는 node.exe 실행파일이 자바스크립트를 읽어서 실행하는 방식이다.
 - 아래 소스를 통해 간단하게 웹 서버 구현이 가능하다.

  #### 서버를 통해 HelloWorld 띄우기

 ```js
 // require  - 모듈을 로딩하는 함수
 // http     - Node.js에 내장된 기본 모듈, 요청/응답을 담당
 var http = require('http');

 var server = http.createServer(function (require, response) {
   response.writeHead(200, { 'Content-Type' : 'text/plain' });
   response.end('Hello World');
 });

 // 8000번 포트로 설정
 server.listen(8000);
 ```
<br><br>


## 2. express
 - express는 많은 유저가 사용하는 웹 프레임워크 모듈로서 보다 더 간단하게 웹 서버를 만들 수 있고 다양한 템플릿 엔진과 기능들을 사용할 수 있음.
 - 공식 홈페이지: http://expressjs.com/

 ```bash
 $ npm install express
 ```

   #### express를 사용해 HTML띄우기

 ```js
 var http = require('http');
 var fs = require('fs');
 var express = require('express');
 var app = express();

 // express 에서는 이미지, CSS,, Javascript 파일과 같은 정적 파일을 제공할 때 express.static을 사용한다.
 // 아래와 같이 images 폴더를 등록하면 http://127.0.0.1/images 에서 해당 폴더의 파일을 로드할 수 있다.
 app.use('/images', express.static(__dirname + '/images'));

 app.get('/', function (request, response) {
     fs.readFile('mail.html', function (error, data) {
         response.writeHead(200, { 'Content-Type': 'text/html' });
         response.end(data);
     });
 });

 app.listen(5000, function () {
     console.log('Server Running...');
 });
 ```
<br><br>

## 3. Socket.io
  - Socket.io는 소켓통신을 지원하는 모듈로서 웹 클라이언트와 서버간의 실시간 통신을 가능하게 한다.
  - 공식 홈페이지: http://socket.io
  - 예제 소스: http://socket.io/get-started/chat/

  ```bash
  $ npm install socket.io
  ```

    #### Socket.io를 사용해 실시간 채팅하기

  ```js
  var app = require('express')();
  var http = require('http').Server(app);
  var io = require('socket.io')(http);

  app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
  });

  // 클라이언트가 접속하면 callback 이벤트 수행
  // 연결된 클라이언트의 shocket 객체를 파라메터로 넘긴다
  io.on('connection', function(socket){
    console.log('user connected');

    socket.emit('chat message', '-- 환영합니다! --');
    socket.broadcast.emit('chat message', '-- 다른 사용자가 접속했습니다! --');

    socket.on('disconnect', function(){
      console.log('user disconnected');
    });

    // index.html에서 보낸 이벤트를 받는다
    socket.on('chat message', function(msg){
      // 나를 포함한 모든 클라이언트에게 이벤트 보낸다
      io.emit('chat message', msg);
    });
  });

  http.listen(3000, function(){
    console.log('listening on *:3000');
  });
  ```
 <br><br>
