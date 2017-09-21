var HOST=require("./defaults.js").HOST;
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
			let fileName=id+""+i+""+now+"."+sampleFile.mimetype.split("/")[1]
			console.log(fileName)
			sampleFile.mv('src/uploads/'+fileName, function(err) {
				if (err){
					res.status(500).send("not uploaded")
					console.log(err);
				  return 
				}

				res.status(200).send("uploaded")
				console.log('File uploaded!');
			});
		}
		console.log("==================")
		
	}
}