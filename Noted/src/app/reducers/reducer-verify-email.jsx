export default function (state="",action) {
	switch(action.type){
		case "VERIFY_THIS_EMAIL":
			return action.payload;
			break;
		
	}
	return state;
}