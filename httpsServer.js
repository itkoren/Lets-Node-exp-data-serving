// Include The 'http' Module
var https = require("https");

var fs = require("fs");

var options = {
    key: fs.readFileSync("./key.pem"),
    cert: fs.readFileSync("./key-cert.pem")
};

// Create the HTTP Server
var server = https.createServer(options, function(req, res) {
    // Handle HTTPS Request
    res.end("Hello World - This time, secured!!!");
}).listen(process.env.PORT || 8443, process.env.HOST || "0.0.0.0", function() {
    console.log("HTTP Server Started. Listening on " + server.address().address + " : Port " + server.address().port);
});