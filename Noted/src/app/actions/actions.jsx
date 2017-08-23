import $ from 'jquery';
export const platformChange= function (id) {
	// alert("in action:" +type);
	// alert(window.innerWidth);
	if(window.innerWidth>560)
	   $(".right-side .content-header").animate({left: '0px'},200);
	return{
		type:"PLATFORM_CHANGED",
		payload:id
	}
}

export const changeAuth= function (type) {
	console.log("changeAuth")
	return{
		type:"AUTH_CHANGED",
		payload:type
	}
}

export const changeAuthType= function (type) {
	console.log("changeAuthType: "+type)

	return{
		type:type
	}
}

export const loggeduser= function (json) {
	return{
		type:"USER_LOGGED_IN",
		payload:json
	}
}
