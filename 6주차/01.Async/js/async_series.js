var async = require('async');
var request = require('request');

// 각 함수가 결과를 반환받은 후 종료된 이후에 호출
function done(err, results) {
  if(err) {
    throw err;
  }
  console.log('결과: %j', results);
};

async.series([
  (callback) => {
    request.post({
      url: 'http://localhost:8080',
      body: '4'
    }, (err, res, body) => {
      callback(err, body);
    });
  },
  (callback) => {
    request.post({
      url: 'http://localhost:8080',
      body: '5'
    }, (err, res, body) => {
      callback(err, body);
    });
  },
  (callback) => {
    request.post({
      url: 'http://localhost:8080',
      body: '6'
    }, (err, res, body) => {
      callback(err, body);
    });
  },
  (callback) => {
    request.post({
      url: 'http://localhost:8080',
      body: '7'
    }, (err, res, body) => {
      callback(err, body);
    });
  }
], done);
