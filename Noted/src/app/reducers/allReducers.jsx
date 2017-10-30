import {combineReducers} from "redux";
import platReducer from "./reducer-platform.jsx";
import authReducer from "./reducer-auth.jsx";
import authTypeReducer from "./reducer-auth-type.jsx";
import loggeduser from "./reducer-user-logged.jsx";
import verify from "./reducer-verify-email.jsx";
import upload from "./reducer-upload-modal.jsx";

const allReducers=combineReducers({
	user:loggeduser,
	onPlatform:platReducer,
	auth:authReducer,
	authType:authTypeReducer,
	verifyEmail:verify,
	uploadmodal:upload

});


export default allReducers;