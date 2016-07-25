
const events = require('events');
const util = require("util");

// 객체 생성
function MyEmitter(){
    events.call(this);
}

// 생성한 객체를 EventEmitter로 부터 상속(Node.js)
util.inherits(MyEmitter, events);

var myEmitter = new MyEmitter();

// 이벤트 등록
myEmitter.on('event', function() {
    console.log('event call');
});

// 이벤트 호출
myEmitter.emit('event');