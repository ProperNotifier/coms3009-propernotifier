import React from 'react';
import {render} from 'react-dom';
import $ from 'jquery';

import Login from './Auth/Login.jsx';
import Register from './Auth/Register.jsx';

import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {changeAuth,changeAuthType,platformChange} from "../actions/actions.jsx";


import {Redirect,Switch,Route,withRouter,Link} from 'react-router-dom';

class Auth extends React.Component {
	constructor(props){
		super(props);
		//alert("location.pathname.split("+"/"+")[1].length");
	    /*const unlisten = history.listen((location, action) => {
		  // location is an object like window.location
		  	  if(location.pathname.split("/").length==2){
				    var id=location.pathname.split("/")[1]||"Dashboard";
				    var TreeItems=["Planner","Timeline"];
				    //alert(location.pathname.split("/")[1].length);


				    switch(id){
				      case "login":
				        this.props.changeAuthType("AUTH_LOGIN");
				        break;
				      case "register":
				        this.props.changeAuthType("AUTH_REGISTER");
				        break;
				      default:
				        this.props.changeAuthType("AUTH_LOGIN");
				        break;
				    }
			  }else{
			  	this.props.changeAuthType("AUTH_LOGIN");
			  }

		})*/
	}
	componentDidMount(){
		/*this.props.history.push("/Login");
		this.props.changeAuth("Login");
		this.setState({});*/
	}
	render () {
		console.log(this.props.authType);
		return (
			<div>
					{this.props.authType=="Login"?<Login/>:""}
					{this.props.authType=="Register"?<Register/>:""}
			</div>
		);
	}
}


function mapStateToProps(state) {
	return({
		authType:state.authType

	});
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({changeAuthType:changeAuthType,changeAuth:changeAuth,platformChange:platformChange},dispatch);
}

export default withRouter(connect(mapStateToProps,matchDispatchToProps)(Auth));
