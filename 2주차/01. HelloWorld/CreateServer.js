// require  - 모듈을 로딩하는 함수
// http     - Node.js에 내장된 기본 모듈, 요청/응답을 담당
var http = require('http');

var server = http.createServer(function (require, response) {
  response.writeHead(200, { 'Content-Type' : 'text/plain' });
  response.end('Hello World');
});

// 8000번 포트로 설정
server.listen(8000);
