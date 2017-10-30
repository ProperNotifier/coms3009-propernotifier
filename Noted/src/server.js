var express   =    require("express");
var app       =    express();
var http      =    require('http');
var server    =    http.createServer(app);
var bodyParser= require('body-parser');
var fileUpload = require('express-fileupload');
var fs = require('fs');

var path = require('path');
var users = require('./server/users.js'); 
var mailer = require('./server/mailer.js'); 
var file = require('./server/file.js'); 
var logfile= './server/log.txt';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

process.on('uncaughtException', function (error) {
   console.log(error.stack);
	let data="\n===============UNCAUGHTEXCEPTION START===============\n";
	   data+=error.stack;
	   data+="\n===============UNCAUGHTEXCEPTION END===============\n";
/*
  fs.appendFile(logfile, data, function(err) {
      if(err) {
          console.log(err.stack);
          return console.log(err);
      }

      console.log("log append!");
  });*/ 
});

app.get("/users",users.list);
app.get("/user/:id",users.getuser);
app.post('/verifyme',users.verify);
app.post("/loginuser",users.login);
app.post("/registeruser",users.register);
app.post("/store/:id",users.store);
app.post("/home/:id",users.home);
app.post("/getnote",users.note);
app.post('/registeredverify', mailer.mail);
app.post('/uploadimages/:id', file.file);
app.post('/uploadjson/:id', file.json);
app.post('/savetex', file.tex);
app.post('/rate',users.rate);

app.use(express.static(path.join(__dirname)));

app.get("/logoblackclear",function(req,res) {
  // body...
  res.sendFile(path.join(__dirname, 'public/img/logoblackclear.png'))
});
app.get("/loading",function(req,res) {
  // body...
  res.sendFile(path.join(__dirname, 'public/img/loading.gif'))
});
app.get("/pdf",function(req,res) {
	// body...
	console.log("gimme pdf")
  res.sendFile(path.join(__dirname, 'stuff/searching.pdf'))
});
// send all auth requests to login.html so browserHistory in React Router works
app.get('/login', function (req, res) {
  res.sendFile(path.join(__dirname, 'login.html'))
});
app.get('/register', function (req, res) {
  res.sendFile(path.join(__dirname, 'login.html'))
});
app.get('/verify', function (req, res) {
  res.sendFile(path.join(__dirname, 'login.html'))
});
app.get('/verifiedaccount', function (req, res) {
  res.sendFile(path.join(__dirname, 'login.html'))
});


// send all requests to index.html so browserHistory in React Router works
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'))
});

app.listen(8081,function (){
  console.log('Production Express server running at localhost:' + 8081);
});
