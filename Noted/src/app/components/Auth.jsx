import React from 'react';
import {render} from 'react-dom';
import $ from 'jquery';

import Login from './Auth/Login.jsx';
import Register from './Auth/Register.jsx';
import Verify from './Auth/Verify.jsx';
import VerifiedAccount from './Auth/VerifiedAccount.jsx';

import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {changeAuth,changeAuthType,platformChange} from "../actions/actions.jsx";


import {Redirect,Switch,Route,withRouter,Link,IndexRoute} from 'react-router-dom';

class Auth extends React.Component {
	constructor(props){
		super(props);
		//alert("location.pathname.split("+"/"+")[1].length");
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
				<Switch>
                  <Route exact path="/" component={Login} />
                  <Route exact path="/login.html" component={Login} />
                  <Route path="/login" component={Login} />
                  <Route path="/register" component={Register} />
                  <Route path="/verify" component={Verify} />
                  <Route path="/verifiedaccount" component={VerifiedAccount} />                  
				</Switch>					
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
