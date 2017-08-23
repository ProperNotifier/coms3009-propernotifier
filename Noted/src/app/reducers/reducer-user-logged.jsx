export default function (state={
              id:0,
              profile_pic:"",
              name:"",
              surname:"",
              organisation:""

           },action) { 
	switch(action.type){
		case "USER_LOGGING_IN":{
			return action.payload;
		}
		break;
		case "USER_LOGGED_IN":{
			/*let id=action.payload;
			var stateRes;
        	/*$.ajax({
		    	url: "http://localhost/AvoFeed/backend/api/getuserdata.php",
		    	data: {
		    		id: id
		    	},
		    	cache: false,
		    	method: "post",
		    	success: function(res){
	                var auth = JSON.parse(res)[0];
	                if (auth != null){
	                	stateRes=auth;
	                }else{
	                	stateRes=state;
	                }
	                
	            },
		    	async:false
		    });*/
		    console.log("LOGin");
			return action.payload;
		}
		break;
		
	}
	return state;
}