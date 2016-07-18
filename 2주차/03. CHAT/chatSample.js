// npm install socket.io
// npm install express
// http://socket.io/get-started/chat/

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
