var express = require('express');
var http = require('http');

var path = require('path');
// var compression = require('compression');

var app = express();
var server = http.createServer(app);

/*app.get('*.js', function (req, res, next) {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  next();
});*/

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static(path.join(__dirname)));

// send all requests to index.html so browserHistory in React Router works
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'))
});


var PORT = process.env.PORT || 8081


/* Start server */
server.listen(PORT, function (){
  console.log('Production Express server running at localhost:' + PORT);
});

module.exports = app;

