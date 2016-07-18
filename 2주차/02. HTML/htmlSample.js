// npm install express

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
