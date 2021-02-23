var mysql = require('mysql');

// Create a DB connection

var con = mysql.createConnection({
	host: "localhost",
	user: "root", 
	password: "",
	database: "tradedb",
})

// MySQL operations

con.connect(function(err){
	if(err) throw err;
	console.log("Connected to MySQL DB");

	// Create the DB

	// con.query("CREATE DATABASE tradedb", function(err, result) {
	// 	if (err) throw err;
	// 	console.log("DB Created ! :)");
	// });

	// Create TABLE

	// var sql = "CREATE TABLE users(id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), email VARCHAR(255))";
	// con.query(sql, function(err, result) {
	// 	if (err) throw err;
	// 	console.log("Table has been created !");
	// });

	// ALTERING CONTENTS OF A TABLE

	// var sql="ALTER TABLE users ADD COLUMN id INT AUTO_INCREMENT PRIMARY KEY";
	// con.query(sql, function(err, result) {
	// 	if (err) throw err;
	// 	console.log("Table has been altered...");
	// });

	// Inserting data into table

	var sql = "INSERT INTO users (name, email) VALUES ('Adam Piasecki', 'c4rt0gr4ph3r@gmail.com')";
	con.query(sql, function(err, result) {
		if (err) throw err;
		console.log("Data sucessfully inserted into table...");
	})
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