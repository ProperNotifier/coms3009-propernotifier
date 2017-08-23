var express   =    require("express");
var app       =    express();
var http      =    require('http');
var server    =    http.createServer(app);
var bodyParser= require('body-parser');

var path = require('path');
var users = require('./server/users.js'); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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