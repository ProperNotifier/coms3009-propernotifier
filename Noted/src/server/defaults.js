// var fs = require('fs'); 
// exports.HOST= "http://165.165.131.69:8081";
// exports.HOST= "http://35.194.222.80:8081";
exports.HOST= "http://localhost:8081";

exports.log=function (data){

  let logfile="log.txt";
  /*fs.appendFile(logfile, data, function(err) {
      if(err) {
          console.log(err.stack);
          return console.log(err);
      }

      console.log("log append!");
  }); */
}
