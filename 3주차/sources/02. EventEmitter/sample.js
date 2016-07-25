
const events = require('events');
const util = require("util");

// 객체 생성
function MyEmitter(){
    events.call(this);
}

// 생성한 객체를 EventEmitter로 부터 상속(Node.js)
util.inherits(MyEmitter, events);

var myEmitter = new MyEmitter();

// 인자값 예제
{
    myEmitter.on('event', function(a, b) {
        console.log('%s %s', a, b);
    });

    myEmitter.emit('event', 'Good', 'Job');
}

// 등록한 이벤트 한번만 호출
// {
//     myEmitter.once('event', function(){
//         console.log('once');
//     });

//     myEmitter.emit('event');
//     myEmitter.emit('event');
// }

// 예외처리 등록
{
    //예상치 못한 예외 처리
    process.on('uncaughtException', function (err) {
        console.log('uncaughtException 발생 : ' + err);
    });
}