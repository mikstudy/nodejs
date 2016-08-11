var async = require('async');
var request = require('request');

var results = {};

function done(err) {
  if(err) {
    throw err;
  }
  console.log('작업 끝! 결과: %j', results);
}

var collection = [1, 2, 3, 4];

function iterator(value, callback) {
  request.post({
    url: 'http://localhost:8080',
    body: JSON.stringify(value)
  }, (err, res, body) => {
    if(err) {
      return callback(err);
    }
    results[value] = JSON.parse(body);
    callback();
  });
}

async.forEach(collection, iterator, done);

// 전 작업이 완료된 후 다음작업 시작
//async.forEachSeries(collection, iterator, done);

// 최대 작업 개수 제어
//var maximumConcurrency = 5;
//async.forEachLimit(collection, maximumConcurrency, iterator, done);
