var async = require('async');
var request = require('request');

// 각 함수가 결과를 반환받은 후 종료된 이후에 호출
function done(err, res, body) {
  if(err) {
    throw err;
  }
  console.log('3^4 = %d', body);
};

async.waterfall([
  (callback) => {
    request.post({
      url: 'http://localhost:8080',
      body: '3'
    }, callback)
  },
  (res, body, callback) => {
    request.post({
      url: 'http://localhost:8080', body: body
    }, callback)
  }
], done);
