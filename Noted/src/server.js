var express   =    require("express");
var app       =    express();
var http      =    require('http');
var server    =    http.createServer(app);
var bodyParser= require('body-parser');
var fs = require('fs');

var path = require('path');
var users = require('./server/users.js'); 
var logfile="server/log.txt";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

process.on('uncaughtException', function (error) {
   console.log(error.stack);
	let data="\n===============UNCAUGHTEXCEPTION START===============\n";
	   data+=error.stack;
	   data+="\n===============UNCAUGHTEXCEPTION END===============\n";

	fs.appendFile(logfile, data, function(err) {
	    if(err) {
	        return console.log(err);
	    }

	    console.log("The file was saved!");
	}); 
});

app.get("/users",users.list);
app.get("/user/:id",users.getuser);
app.post("/loginuser",users.login);
app.post("/registeruser",users.register);

app.use(express.static(path.join(__dirname)));

// send all requests to index.html so browserHistory in React Router works
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'))
});

app.listen(8081,function (){
  console.log('Production Express server running at localhost:' + 8081);
});
