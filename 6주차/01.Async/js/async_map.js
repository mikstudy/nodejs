var async = require('async');
var request = require('request');

function done(err, results) {
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
    callback(err, JSON.parse(body));
  });
}

async.map(collection, iterator, done);
