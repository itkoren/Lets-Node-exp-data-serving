var http = require("http");
// utilities for working with file paths
var path = require("path");
// utilities for accessing the file system
var fs = require("fs");
// Include The 'url' Module
var url = require("url");

function getFile(localPath, res) {
    // read the file in and return it, or return a 500 if it can't be read
    fs.readFile(localPath, function(err, contents) {
        if (!err) {
            res.writeHead(200, {"Content-Type": "text/html"});
            res.end(contents);
        } else {
            res.writeHead(500);
            res.end();
        }
    });
}

var server = http.createServer(function(req, res) {
    // look for a filename in the URL, default to index.html
    // Parse the request querystring
    var parsedUrl = url.parse(req.url, true);
    var qs = parsedUrl.query;

    // Get the needed file
    var filename = path.basename(parsedUrl.pathname) || qs.file || "hello";
    var ext = path.extname(filename) || qs.ext || ".html";
    filename += ext;

    // __dirname is a built-in variable containing the path where the code is running
    var localPath = __dirname + "/public/";
    if (".html" === ext) {
        localPath += filename;
        // verify that this file actually exists and load it, or else return a 404
        fs.exists(localPath, function(exists) {
            if (exists) {
                getFile(localPath, res);
            } else {
                res.writeHead(404);
                res.end();
            }
        });
    }
}).listen(process.env.PORT || 8000, process.env.HOST || "0.0.0.0", function() {
    console.log("HTTP Server Started. Listening on " + server.address().address + " : Port " + server.address().port);
});