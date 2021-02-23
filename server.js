var mysql = require('mysql');

// Create a DB connection

var con = mysql.createConnection({
	host: "localhost",
	user: "root", 
	password: "",
})

// Connect to MySQL
con.connect(function(err){
	if(err) throw err;
	console.log("Connected to MySQL DB");
});

var http = require ('http');
var fs = require ('fs');
var port = 8080;
var url = require('url');

http.createServer(function (req, res) {
	var q = url.parse(req.url, true);
	console.log(q.pathname);
	var filename = "." + q.pathname;
	if (filename == "./") {filename = "./index";}

	filename = filename + ".html";
	console.log(filename)

	fs.readFile(filename, function(err, data) {
		if (err) {1
			res.writeHead(404, {'Content-Type' : 'text/html'});
			return res.end("404 Not Found");
		}
		res.writeHead(200, {'Content-Type' : 'text/html'});
		res.write(data);
		return res.end();
	});
}).listen(port);

console.log("Server listening on the port: " + port);