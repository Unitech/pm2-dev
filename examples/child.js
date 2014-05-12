
var http = require('http');

setInterval(function() {
  console.log('child-log !');
}, 800);

http.createServer(function(req, res) {
  res.writeHead(200);
  res.end('hey');
}).listen(8000);
