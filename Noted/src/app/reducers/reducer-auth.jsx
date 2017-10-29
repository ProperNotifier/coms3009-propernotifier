export default function (state="Auth",action) {
	switch(action.type){
		case "AUTH_CHANGED":
		    window.scrollTo(0,0);
			return action.payload;
			break;
		case "USER_AUTH":
		    window.scrollTo(0,0);
			return "Auth";
			break;
		case "USER_LOGGED":
			return "Logged";
			break;
		
	}



	return state;
}