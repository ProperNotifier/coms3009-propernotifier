import React from 'react';
import {render} from 'react-dom';
import cookie from "react-cookie"
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {platformChange, changeAuth,loggeduser} from "../actions/actions.jsx";

import Header from './Header.jsx';
import SideBar from './SideBar.jsx';
import Platform from './Platform.jsx';
import AuthBody from './Auth.jsx';



class AllComponents extends React.Component {
	constructor(props){
	    super(props);
	    console.log("IN APPPPPPPP")
	    let id=getCookie("id");
	    $.get("http://localhost:8081/user/"+id, function(data, status){
	        //alert("Data: " + data + "\nStatus: " + status);
	        console.log(data)
	        this.props.loggeduser(data[0])
	    }.bind(this));
	}
	render () {
		return (
			<div>
				<Header/>
				<SideBar/>
				<Platform/>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return({
		platform:state.onPlatform
		
	});
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators({platformChange:platformChange,loggeduser:loggeduser},dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(AllComponents);

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}