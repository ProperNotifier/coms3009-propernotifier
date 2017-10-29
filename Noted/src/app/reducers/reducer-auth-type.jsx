export default function (state="Login",action) {
	switch(action.type){
		case "AUTH_LOGIN":
		    window.scrollTo(0,0);
			return "Login";
			break;
		case "AUTH_REGISTER":
			return "Register";
			break;
		case "AUTH_VERIFY":
			return "Verify";
			break;
		
	}



	return state;
}