var async = require('async');
var request = require('request');

var maximumConcurrency = 5;

function worker(task, callback) {
  request.post({
    url: 'http://localhost:8080',
    body: JSON.stringify(task)},
    (err, res, body) => {
        callback(err, JSON.parse(body));
    });
}

var queue = async.queue(worker, maximumConcurrency);

// 최대 동시 작업 한계에 도달했을 때 이벤트 발생
queue.saturated = () =>{
  console.log('큐 포화 상태임');
};
//큐에 들어 있는 마지막 항목이 작업자에게 전달되는 시점에 발생
queue.empty = () => {
  console.log('큐가 비어 있음');
};
// 큐에 있는 마지막 작업을 반환하는 시점에 발생
queue.drain = () => {
  console.log('큐가 비어짐. 더 이상 할 일 없음');
};

[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach((i) => {
  queue.push(i, (err, result) => {
    if(err){
      throw err;
    }
    console.log(i + '^2 = %d', result);
  });
});
