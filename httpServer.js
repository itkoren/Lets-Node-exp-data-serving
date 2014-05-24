// Include The 'http' Module
var http = require("http");

// Create the HTTP Server
var server = http.createServer(function(req, res) {
    // Handle HTTP Request
    res.end("Hello World");
}).listen(process.env.PORT || 8000, process.env.HOST || "0.0.0.0", function() {
    console.log("HTTP Server Started. Listening on " + server.address().address + " : Port " + server.address().port);
});