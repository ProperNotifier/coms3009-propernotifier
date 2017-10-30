export default function (state="closed",action) {
	switch(action.type){
		case "UPLOAD_MODAL_STATE":
			return action.payload;
			break;
		
	}
	return state;
}