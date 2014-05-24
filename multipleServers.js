var http = require("http");
var net = require("net");
var c = 0;

var server1 = http.createServer(function(req, res) {
  c++;
  res.writehead(200);
  res.end("Hello World (Wide Web)");
}).listen(3000, function(){
	console.log("HTTP Server listening on port", server1.address().port);
});

var server2 = net.createServer(function(socket) {
  socket.write("Connections: " + c);
  socket.end();
}).listen(3001, function(){
	console.log("TCP Server listening on port", server2.address().port);
});