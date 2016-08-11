var async = require('async');
var request = require('request');

function done(err, result) {
  console.log('%j의 요소들 중 제곱 값이 10보다 큰 첫 번째 요소 : %j', collection, result);
}

function test(value) {
  return value > 10;
}

var collection = [1, 2, 3, 4, 5];

function detect(item, callback) {
  request.post({
    url: 'http://localhost:8080',
    body: JSON.stringify(item)
  }, (err, res, body) => {
    if(err) {
      throw err;
    }
    callback(err, test(JSON.parse(body)));
  });
}

async.detect(collection, detect, done);
