var HOST=require("./defaults.js").HOST;
var uploadDir="uploads/";
var fs = require('fs');
var spawn = require('child_process').spawn;
const POOL = require("./users").POOL;

var pyOCRDir="../../../../Seg/coms3009-propernotifier/";
var pythonIMAGE=pyOCRDir+"pyocr.py";//image.py";
var pythonJSON=pyOCRDir+"latex_gen.py";

exports.file=function(req,res) {
	// body...
	let id=req.params.id;  
	if (!req.files)
    	console.log('No files were uploaded.');
    else{
    	let keys=Object.keys(req.files)//.split(",")
		console.log("UP "+id+" "+Object.keys(req.files))
		console.log("UP "+id+" "+req.files[keys[0]])

		for (var i = 0; i < keys.length; i++) {
			let sampleFile=req.files[keys[i]];
			let now=(new Date()).getTime();
			console.log("UP file "+Object.keys(sampleFile))
			let fileName=id+""+i+""+now+"."+sampleFile.mimetype.split("/")[1]
			console.log(fileName)

			var dataString="";
			// console.log("UP fileEncoding "+sampleFile.encoding)
			// console.log("UP fileData "+sampleFile.data)
			var py=spawn("python3",[pythonIMAGE]);
			py.stdout.on('data', function(data){
			  dataString += data.toString();
			  console.log('Summing...',dataString);
			});

			py.stderr.on('data', (data) => {
			  console.log(`stderr: ${data}`);
			});

			py.stdout.on('end', function(){
			  console.log('DONE');
			  sampleFile.mv(uploadDir+id+"/"+fileName, function(err) {
					if (err){
						res.status(500).send("not uploaded")
						console.log(err);
					  return 
					}

					res.status(200).send(dataString)
					console.log('File uploaded!');
				});
			});
			py.stdin.write(new Buffer(sampleFile.data).toString('base64'));
			// py.stdin.write(fileName);
			py.stdin.end();
			
		}
		console.log("==================")
		
	}
}

exports.json=function(req,res) {
	// body...
	 
	if (!req.body)
    	console.log('No files were uploaded.');
    else{
			let id=req.params.id; 
			let newJSON=req.body.json;
			let title=req.body.title;
			let description=req.body.description;
			let price=req.body.price;

			let now=(new Date()).getTime();
			let fileName=id+now+".json";
			POOL.getConnection(function(err,connection){
		       if (err) {
		         connection.release();
		         // res.json({"code" : 100, "status" : "Error in connection database"});
		         return;
		       }
		       let insertdata=[id,title,description,price]
		       let query = `INSERT INTO BOOKS
	                      SET book_owner_id=?, book_name=?, book_description=?, book_price=?`;				
				console.log("Aout to db")
		       connection.query(query,insertdata,function(err,rows) {
				console.log("DB");
		            if(err){
	        	      	 console.log("Error Inserting : %s ",err );
				
	        	      	 res.status(100).send("error")
	        	      	 return;
		            }
		            // rows.insertId;
		            var object={
		            	"userId":id,
		            	"bookId":rows.insertId,
		            	"data":JSON.parse(newJSON)
		            }
					var dataString="";
					var objectString=JSON.stringify(object);
					// console.log("UP fileEncoding "+sampleFile.encoding)
					// console.log("UP fileData "+sampleFile.data)
					var py=spawn("python3",[pythonJSON]);
					py.stdout.on('data', function(data){
					  dataString += data.toString();
					  console.log('Summing...');
					});

					py.stderr.on('data', (data) => {
					  console.log(`stderr: ${data}`);
					  res.status(100).send("error")
					});

					py.stdout.on('end', function(){
					  console.log('DONE',dataString);
						var oldTexPath = id+rows.insertId
						var newTexPath = uploadDir+id+"/"+id+rows.insertId+".tex"
						fs.rename(oldTexPath, newTexPath, function (err) {
						  if (err) throw err
						  console.log('Successfully renamed - AKA moved!')
							var oldPdfPath = id+rows.insertId+".pdf"
							var newPdfPath = uploadDir+id+"/"+id+rows.insertId+".pdf"
							fs.rename(oldPdfPath, newPdfPath, function (err) {
							  if (err) throw err
							  //console.log('Successfully renamed - AKA moved!')
								var query='UPDATE BOOKS SET book_pdf_directory=?,book_latex_directory=?,book_available=?';
								var insertdata=[HOST+"/"+newTexPath,HOST+"/"+newPdfPath,1]
								connection.query(query,insertdata,function(err,rows){
									if(err){
					        	      	 console.log("Error Updating : %s ",err );								
					        	      	 res.status(100).send("error")
					        	      	 return;
						            }
						            res.status(200).send(dataString)

								})

							})
						})


							
					});
					py.stdin.write(objectString);
					// py.stdin.write(fileName);
					py.stdin.end();
		        });
		   });
			
		console.log("==================")
		
	}
}

function LOG(data){

  let logfile="log.txt";
  fs.appendFile(logfile, data, function(err) {
      if(err) {
          console.log(err.stack);
          return console.log(err);
      }

      console.log("log append!");
  }); 
}
