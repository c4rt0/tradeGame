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

	// var sql = "INSERT INTO users (name, email) VALUES ('Mia Piasecki', 'mia@gmail.com')";
	// con.query(sql, function(err, result) {
	// 	if (err) throw err;
	// 	console.log("Data sucessfully inserted into table...");
	// });

	// Insert many values into table

	// var sql = "INSERT INTO users (name, email) VALUES ?";
	// var values = [
	// 	['Sample1', 'sample1@email.com'],
	// 	['Sample2', 'sample2@email.com'],
	// 	['Sample3', 'sample3@email.com'],	
	// ]
	// con.query(sql, [values], function(err, result) {
	// 	if (err) throw err;
	// 	console.log("Records succesfully inserted: " + result.affectedRows);
	// 	console.log(result);
	// });

	// Presenting results

	// var sql = "INSERT INTO users (name, email) VALUES ('Jack Nicholson', 'creepy@gmail.com')";
	// con.query(sql, function(err, result) {
	// 	if (err) throw err;
	// 	console.log(result);
	// 	console.log("Affected Rows: ")
	// 	console.log(result.affectedRows);
	// });

	// Pulling ALL data out of the database 

	// var sql = "SELECT * FROM users";
	// con.query(sql, function(err, result, fields) {
	// 	if (err) throw err;
	// 	console.log(result);
	// });

	// Pulling only selected fields out of the database 

	// var sql = "SELECT * FROM users";
	// con.query(sql, function(err, result, fields) {
	// 	if (err) throw err;
	// 	console.log(result[0].name);
	// });

	// Introducing simple loop to pull names from all DB data

	// var sql = "SELECT * FROM users";
	// con.query(sql, function(err, result, fields) {
	// 	if (err) throw err;
	// 	var i;
	// 	for (i= 0; i < result.length; i++ ) {
	// 		console.log(result[i].name + " | " + result[i].email);
	// 	};

	// Pulling selected columns from DB only

	// var sql = "SELECT id, name, email FROM users";
	// con.query(sql, function(err, result, fields) {
	// 	if (err) throw err;
	// 	console.log(result);
	// });

	// FIELDS

	var sql = "SELECT * FROM users";
	con.query(sql, function(err, result, fields) {
		if (err) throw err;
		// all names :
		var i;
		for (i = 0; i < fields.length; i++ ) {
			console.log(fields[i].name);
		};

		// only name of first field (0'th element)
		console.log("Some text")
		console.log(" ")
		console.log(fields[0].name);		
	});

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