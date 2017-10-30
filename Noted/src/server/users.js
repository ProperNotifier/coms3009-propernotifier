/*
 * GET customers listing.
 */
var mysql     =    require('mysql');
var fs = require('fs');
var uploadDir="uploads/";

var pool      =    mysql.createPool({
   connectionLimit : 100, //important
   host     : 'localhost',
   user     : 'root',
   password : 'password',
   database : 'Noted',
   debug    :  false
});
exports.POOL=pool;
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
                res.json(rows).send(200);
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
  console.log("login")
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
        // console.log('UPDATE USERS SET user_verified=1')
       let query = `UPDATE USERS SET user_verified=1
            WHERE user_email=?`
  // console.log(query+email);
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
                
                let query = `SELECT user_id as id FROM USERS 
                              WHERE user_email=?`;
                connection.query(query,[email],function(err,rows){
                  console.log(rows[0].id);
                  var dir=uploadDir+rows[0].id;
                  if (!fs.existsSync(dir)){
                      fs.mkdirSync(dir);
                      console.log("Done")
                  }else
                  {
                      console.log("Directory already exist");
                  }
                });


                           
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


exports.notebook = function(req, res){
  var id = req.params.id;
  var input = JSON.parse(JSON.stringify(req.body));
  console.log("login")
  pool.getConnection(function(err,connection){
       if (err) {
         connection.release();
         res.json({"code" : 100, "status" : "Error in connection database"})
         return;
       }
   

       console.log('connected as id ' + connection.threadId);
          let query=`SELECT b.book_id as id, b.book_name as name, b.book_description as description, b.book_price as price, 
            b.book_dateposted as date,u.user_id as user_id,u.user_firstname as firstname, u.user_surname as surname, 
               (SELECT AVG(r.rating_rating) FROM RATINGS r WHERE r.book_id=b.book_id) as ratings,
                        IF(
                            (SELECT COUNT(rated_by) FROM RATINGS r 
                            WHERE r.book_id = b.book_id AND r.rated_by=?) > 0 ,'true','false'
                        ) as rated 
                      FROM BOOKS b 
                      LEFT JOIN USERS u ON b.book_owner_id=u.user_id 
                      LEFT JOIN RATINGS r ON b.book_id = r.rated_by
                        WHERE b.book_available=1 AND b.book_owner_id=?
                        GROUP BY b.book_id
                      ORDER BY b.book_dateposted DESC `
            /*`SELECT b.book_id as id, b.book_name as name, b.book_description as description, b.book_price as price, 
              b.book_dateposted as date,u.user_id as user_id,u.user_firstname as firstname, u.user_surname as surname, 
                  COUNT(r.rated_by) as ratings,
                          IF(
                              (SELECT COUNT(rated_by) FROM RATINGS r 
                              WHERE r.book_id = b.book_id AND r.rated_by=1) > 0 ,'true','false'
                          ) as rated 
                        FROM BOOKS b 
                        LEFT JOIN USERS u ON b.book_owner_id=u.user_id 
                        LEFT JOIN RATINGS r ON b.book_id = r.rated_by
                          WHERE (p.user_id IN(SELECT follow_following FROM FOLLOW WHERE follow_follower=:id)  OR p.user_id=:id)
                          GROUP BY b.book_id
                        ORDER BY b.book_dateposted DESC `

                let query=`SELECT user_id as id,user_verified as verified FROM USERS
                    WHERE (user_email=?) AND (user_password=?)`
                book_id
                book_owner_id
                book_name
                book_description
                book_dateposted
                book_price
                book_pdf_directory
                book_latex_directory*/

         connection.query(query,[id,id],function(err,rows){
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

exports.rate=function(req,res) {
  var input = JSON.parse(JSON.stringify(req.body));
  pool.getConnection(function(err,connection){
       if (err) {
         connection.release();
         res.json({"code" : 100, "status" : "Error in connection database"})
         return;
       }
   

       console.log('connected as id ' + connection.threadId);

        let query=`INSERT INTO RATINGS SET
                    book_id=?,rated_by=?,rating_rating=?
                   ON DUPLICATE KEY UPDATE 
                    rating_rating=?
                  `

         connection.query(query,[input.book_id,input.rated_by,input.rating,parseInt(input.rating)],function(err,rows){
            connection.release();
            if(err){
               console.log("Error Selecting : %s ",err );
                let data="\n===============ERROR START===============\n";
                   data+=err;
                   data+="\n===============ERROR END===============\n";
                log(data);

            }

                //res.render('customers',{page_title:"Customers - Node.js",data:rows});
                res.json("rated");
                console.log("rows answer");
                console.log(rows.insertId);
                           
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

}

exports.note = function(req, res){
  var id = req.params.id;
  var input = JSON.parse(JSON.stringify(req.body));
  console.log("login")
  pool.getConnection(function(err,connection){
       if (err) {
         connection.release();
         res.json({"code" : 100, "status" : "Error in connection database"})
         return;
       }
   

       console.log('connected as id ' + connection.threadId);
          let query=`SELECT b.book_id as id, b.book_name as title, b.book_description as description, b.book_price as price, 
            b.book_dateposted as date,b.book_pdf_directory as pdf,b.book_latex_directory as latex,u.user_id as user_id,u.user_firstname as firstname, u.user_surname as surname, 
                (SELECT AVG(r.rating_rating) FROM RATINGS r WHERE r.book_id=?) as ratings,
                        IF(
                            (SELECT COUNT(rated_by) FROM RATINGS r 
                            WHERE r.book_id = b.book_id AND r.rated_by=?) > 0 ,'true','false'
                        ) as rated 
                      FROM BOOKS b 
                      LEFT JOIN USERS u ON b.book_owner_id=u.user_id 
                      LEFT JOIN RATINGS r ON b.book_id = r.rated_by
                        WHERE b.book_available=1 AND b.book_id=?
                        GROUP BY b.book_id
                      ORDER BY b.book_dateposted DESC; `
            /*`SELECT b.book_id as id, b.book_name as name, b.book_description as description, b.book_price as price, 
              b.book_dateposted as date,u.user_id as user_id,u.user_firstname as firstname, u.user_surname as surname, 
                  COUNT(r.rated_by) as ratings,
                          IF(
                              (SELECT COUNT(rated_by) FROM RATINGS r 
                              WHERE r.book_id = b.book_id AND r.rated_by=1) > 0 ,'true','false'
                          ) as rated 
                        FROM BOOKS b 
                        LEFT JOIN USERS u ON b.book_owner_id=u.user_id 
                        LEFT JOIN RATINGS r ON b.book_id = r.rated_by
                          WHERE (p.user_id IN(SELECT follow_following FROM FOLLOW WHERE follow_follower=:id)  OR p.user_id=:id)
                          GROUP BY b.book_id
                        ORDER BY b.book_dateposted DESC `

                let query=`SELECT user_id as id,user_verified as verified FROM USERS
                    WHERE (user_email=?) AND (user_password=?)`
                book_id
                book_owner_id
                book_name
                book_description
                book_dateposted
                book_price
                book_pdf_directory
                book_latex_directory*/

         connection.query(query,[input.book_id,input.user_id,input.book_id],function(err,rows){
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

exports.home = function(req, res){
  var id = req.params.id;
  var input = JSON.parse(JSON.stringify(req.body));
  console.log("login")
  pool.getConnection(function(err,connection){
       if (err) {
         connection.release();
         res.json({"code" : 100, "status" : "Error in connection database"})
         return;
       }
   

       console.log('connected as id ' + connection.threadId);
          let query=`SELECT b.book_id as id, b.book_name as name, b.book_description as description, b.book_price as price, 
            b.book_dateposted as date,u.user_id as user_id,u.user_firstname as firstname, u.user_surname as surname, 
               (SELECT AVG(r.rating_rating) FROM RATINGS r WHERE r.book_id=b.book_id) as ratings,
                        IF(
                            (SELECT COUNT(rated_by) FROM RATINGS r 
                            WHERE r.book_id = b.book_id AND r.rated_by=?) > 0 ,'true','false'
                        ) as rated 
                      FROM BOOKS b 
                      LEFT JOIN USERS u ON b.book_owner_id=u.user_id 
                      LEFT JOIN RATINGS r ON b.book_id = r.rated_by
                        WHERE b.book_available=1 AND b.book_owner_id=?
                        GROUP BY b.book_id
                      ORDER BY b.book_dateposted DESC 
                      LIMIT 0, 8`
            /*`SELECT b.book_id as id, b.book_name as name, b.book_description as description, b.book_price as price, 
              b.book_dateposted as date,u.user_id as user_id,u.user_firstname as firstname, u.user_surname as surname, 
                  COUNT(r.rated_by) as ratings,
                          IF(
                              (SELECT COUNT(rated_by) FROM RATINGS r 
                              WHERE r.book_id = b.book_id AND r.rated_by=1) > 0 ,'true','false'
                          ) as rated 
                        FROM BOOKS b 
                        LEFT JOIN USERS u ON b.book_owner_id=u.user_id 
                        LEFT JOIN RATINGS r ON b.book_id = r.rated_by
                          WHERE (p.user_id IN(SELECT follow_following FROM FOLLOW WHERE follow_follower=:id)  OR p.user_id=:id)
                          GROUP BY b.book_id
                        ORDER BY b.book_dateposted DESC `

                let query=`SELECT user_id as id,user_verified as verified FROM USERS
                    WHERE (user_email=?) AND (user_password=?)`
                book_id
                book_owner_id
                book_name
                book_description
                book_dateposted
                book_price
                book_pdf_directory
                book_latex_directory*/

         connection.query(query,[id,id],function(err,rows){
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
exports.store = function(req, res){
  var id = req.params.id;
  var input = JSON.parse(JSON.stringify(req.body));
  console.log("login")
  pool.getConnection(function(err,connection){
       if (err) {
         connection.release();
         res.json({"code" : 100, "status" : "Error in connection database"})
         return;
       }
   

       console.log('connected as id ' + connection.threadId);
          let query=`SELECT b.book_id as id, b.book_name as name, b.book_description as description, b.book_price as price, 
            b.book_dateposted as date,u.user_id as user_id,u.user_firstname as firstname, u.user_surname as surname, 
               (SELECT AVG(r.rating_rating) FROM RATINGS r WHERE r.book_id=b.book_id) as ratings,
                        IF(
                            (SELECT COUNT(rated_by) FROM RATINGS r 
                            WHERE r.book_id = b.book_id AND r.rated_by=?) > 0 ,'true','false'
                        ) as rated 
                      FROM BOOKS b 
                      LEFT JOIN USERS u ON b.book_owner_id=u.user_id 
                      LEFT JOIN RATINGS r ON b.book_id = r.rated_by
                        WHERE b.book_available=1
                        GROUP BY b.book_id
                      ORDER BY b.book_dateposted DESC`
            /*`SELECT b.book_id as id, b.book_name as name, b.book_description as description, b.book_price as price, 
              b.book_dateposted as date,u.user_id as user_id,u.user_firstname as firstname, u.user_surname as surname, 
                  COUNT(r.rated_by) as ratings,
                          IF(
                              (SELECT COUNT(rated_by) FROM RATINGS r 
                              WHERE r.book_id = b.book_id AND r.rated_by=1) > 0 ,'true','false'
                          ) as rated 
                        FROM BOOKS b 
                        LEFT JOIN USERS u ON b.book_owner_id=u.user_id 
                        LEFT JOIN RATINGS r ON b.book_id = r.rated_by
                          WHERE (p.user_id IN(SELECT follow_following FROM FOLLOW WHERE follow_follower=:id)  OR p.user_id=:id)
                          GROUP BY b.book_id
                        ORDER BY b.book_dateposted DESC `

                let query=`SELECT user_id as id,user_verified as verified FROM USERS
                    WHERE (user_email=?) AND (user_password=?)`
                book_id
                book_owner_id
                book_name
                book_description
                book_dateposted
                book_price
                book_pdf_directory
                book_latex_directory*/

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
function log(data){

	let log="log.txt";
	fs.appendFile(log, data, function(err) {
	    if(err) {
	        return console.log(err);
	    }

	    console.log("The file was saved!");
	}); 
}
