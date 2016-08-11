var port = process.argv[2] && parseInt(process.argv[2], 10) || 8080;

require('http').createServer((req, res) => {
  var body = '';

  req.setEncoding('utf8');

  req.on('data', (data) => {
    body += data;
  });

  req.once('end', () => {
    var number = JSON.parse(body);
    var squared = Math.pow(number, 2);
    res.end(JSON.stringify(squared));
  });

}).listen(port,  () => {
  console.log('제곱 값 계산 서버 %d 리스닝', port);
});
