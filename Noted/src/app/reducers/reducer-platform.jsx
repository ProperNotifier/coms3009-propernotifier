import $ from 'jquery';
export default function (state="Home",action) {
	switch(action.type){
		case "PLATFORM_CHANGED":
		    // window.scrollTo(0,0);
		    $(".right-side").scrollTop(0);
			return action.payload;
			break;
		
	}



	return state;
}