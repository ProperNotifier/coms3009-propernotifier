/*
 * GET customers listing.
 */
var mysql     =    require('mysql');
var fs = require('fs');

var pool      =    mysql.createPool({
   connectionLimit : 100, //important
   host     : 'localhost',
   user     : 'root',
   password : 'password',
   database : 'Noted',
   debug    :  false
});

exports.list = function(req, res){

  pool.getConnection(function(err,connection){
       if (err) {
         connection.release();
         res.json({"code" : 100, "status" : "Error in connection database"});
        let data="\n===============DATABASE CONN ERROR START===============\n";
           data+="Error in connection database";
           data+="\n===============DATABASE CONN ERROR END===============\n";
        log(data);

         return;
       }   

       console.log('connected as id ' + connection.threadId);

         connection.query('SELECT * FROM USERS',function(err,rows){
            connection.release();
            if(err){
               console.log("Error Selecting : %s ",err );
                let data="\n===============ERROR START===============\n";
                   data+=err;
                   data+="\n===============ERROR END===============\n";
                log(data);

            }

         
                //res.render('customers',{page_title:"Customers - Node.js",data:rows});
                res.json(rows);
                // console.log(rows);
                           
         });

       connection.on('error', function(err) {      
             res.json({"code" : 100, "status" : "Error in connection database"});
        let data="\n===============DATABASE CONN ERROR START===============\n";
           data+="Error in connection database";
           data+="\n===============DATABASE CONN ERROR END===============\n";
        log(data);

             return;     
       });
  });
  
};

exports.getuser = function(req, res){
  var id = req.params.id;

  pool.getConnection(function(err,connection){
       if (err) {
         connection.release();
         res.json({"code" : 100, "status" : "Error in connection database"});
        let data="\n===============DATABASE CONN ERROR START===============\n";
           data+="Error in connection database";
           data+="\n===============DATABASE CONN ERROR END===============\n";
        log(data);

         return;
       }   

       console.log('connected as id ' + connection.threadId);
       console.log('SELECT * FROM USERS WHERE user_id='+id)
       let query = `SELECT user_id as id, user_firstname as name,user_surname as surname, user_organisation as organisation,user_image as image FROM USERS
            WHERE user_id=?`

         connection.query(query,[id],function(err,rows){
            connection.release();
            if(err){
               console.log("Error Selecting : %s ",err );
        	let data="\n===============ERROR START===============\n";
	           data+=err;
        	   data+="\n===============ERROR END===============\n";
	        log(data);

	    }
         
                //res.render('customers',{page_title:"Customers - Node.js",data:rows});
                res.json(rows);
                // console.log(rows);
                           
         });

       connection.on('error', function(err) {      
             res.json({"code" : 100, "status" : "Error in connection database"});
        let data="\n===============DATABASE CONN ERROR START===============\n";
           data+="Error in connection database";
           data+="\n===============DATABASE CONN ERROR END===============\n";
        log(data);

             return;     
       });
  });
  
};

exports.login = function(req, res){
  // var id = req.params.id;
  var input = JSON.parse(JSON.stringify(req.body));

  pool.getConnection(function(err,connection){
       if (err) {
         connection.release();
         res.json({"code" : 100, "status" : "Error in connection database"})
         return;
       }
   

       console.log('connected as id ' + connection.threadId);

        let query=`SELECT user_id as id,user_verified as verified FROM USERS
            WHERE (user_email=?) AND (user_password=?)`

         connection.query(query,[input.email,input.password],function(err,rows){
            connection.release();
            if(err){
               console.log("Error Selecting : %s ",err );
                let data="\n===============ERROR START===============\n";
                   data+=err;
                   data+="\n===============ERROR END===============\n";
                log(data);

            }

                //res.render('customers',{page_title:"Customers - Node.js",data:rows});
                res.json(rows);
                console.log("rows answer");
                console.log(rows);
                           
         });

       connection.on('error', function(err) {      
             res.json({"code" : 100, "status" : "Error in connection database"});
        let data="\n===============DATABASE CONN ERROR START===============\n";
           data+="Error in connection database";
           data+="\n===============DATABASE CONN ERROR END===============\n";
        log(data);

             return;     
       });
  });
  
};

exports.register = function(req, res){
  // var id = req.params.id;
  var input = JSON.parse(JSON.stringify(req.body));

  pool.getConnection(function(err,connection){
       if (err) {
         connection.release();
         res.json({"code" : 100, "status" : "Error in connection database"});
        let data="\n===============DATABASE CONN ERROR START===============\n";
           data+="Error in connection database";
           data+="\n===============DATABASE CONN ERROR END===============\n";
	log(data);
         return;
       }   

       console.log('connected as id ' + connection.threadId);
        let query = `SELECT user_id as id FROM USERS
                          WHERE (user_email=?) AND (user_password=?) `;

         connection.query(query,[input.email,input.password,input.organisation,input.occupation,input.firstname,input.surname],function(err,rows){
           // connection.release();
            if(err){
               console.log("Error Selecting : %s ",err );
                let data="\n===============ERROR START===============\n";
                   data+=err;
                   data+="\n===============ERROR END===============\n";
                log(data);

            }

             if (rows.length==0) {
         
              let query = `INSERT INTO USERS
                      SET user_email=?, user_password=?, user_organisation=?, user_occupation=?, user_firstname=?,
                          user_surname=?,user_image="/public/img/user.png" `;

               connection.query(query,[input.email,input.password,input.organisation,input.occupation,input.name,input.surname],function(err,rows){
                 // connection.release();
	            if(err){
        	      	 console.log("Error Selecting : %s ",err );
        	        let data="\n===============ERROR START===============\n";
	                   data+=err;
                	   data+="\n===============ERROR END===============\n";
        	        log(data);
	
	            }
               
                      //res.render('customers',{page_title:"Customers - Node.js",data:rows});
                      // res.json(rows);
                      console.log("rows answer");
                      let query=`SELECT user_id as id FROM USERS
                          WHERE (user_email=?) AND (user_password=?)`

                       connection.query(query,[input.email,input.password],function(err,rows){
                          connection.release();
		            if(err){
		               console.log("Error Selecting : %s ",err );
                		let data="\n===============ERROR START===============\n";
		                   data+=err;
                		   data+="\n===============ERROR END===============\n";
        		        log(data);

		            }
                                             
                              //res.render('customers',{page_title:"Customers - Node.js",data:rows});
                              res.json(rows);
                              console.log("rows answer");
                              console.log(rows);
                                         
                       });
                                 
               });
             }else{
                res.json(rows);
             }
                           
         });

       connection.on('error', function(err) {      
             res.json({"code" : 100, "status" : "Error in connection database"});
        let data="\n===============DATABASE CONN ERROR START===============\n";
           data+="Error in connection database";
           data+="\n===============DATABASE CONN ERROR END===============\n";
        log(data);

             return;     
       });
  });
  
};

exports.verify=function(req, res){
  var input = JSON.parse(JSON.stringify(req.body));
  var email = input.email;

  pool.getConnection(function(err,connection){
       if (err) {
         connection.release();
         res.json({"code" : 100, "status" : "Error in connection database"});
        let data="\n===============DATABASE CONN ERROR START===============\n";
           data+="Error in connection database";
           data+="\n===============DATABASE CONN ERROR END===============\n";
        log(data);

         return;
       }   

       console.log('connected as id ' + connection.threadId);
//       console.log('UPDATE USERS SET user_verified=1')
       let query = `UPDATE USERS SET user_verified=1
            WHERE user_email=?`
console.log(query+email);
         connection.query(query,[email],function(err,rows){
            connection.release();
            if(err){
               console.log("Error Selecting : %s ",err );
          let data="\n===============ERROR START===============\n";
             data+=err;
             data+="\n===============ERROR END===============\n";
          log(data);

      }
         
                //res.render('customers',{page_title:"Customers - Node.js",data:rows});
                res.json(rows);
                // console.log(rows);
                           
         });

       connection.on('error', function(err) {      
             res.json({"code" : 100, "status" : "Error in connection database"});
        let data="\n===============DATABASE CONN ERROR START===============\n";
           data+="Error in connection database";
           data+="\n===============DATABASE CONN ERROR END===============\n";
        log(data);

             return;     
       });
  });
  

};

function log(data){

	let log="log.txt";
	fs.appendFile(log, data, function(err) {
	    if(err) {
	        return console.log(err);
	    }

	    console.log("The file was saved!");
	}); 
}
