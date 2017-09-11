import React from 'react';
import {render} from 'react-dom';
import { BrowserRouter as Router,Link,Route,IndexRoute, browserHistory, hashHistory,Redirect,withRouter} from 'react-router-dom';
import cookie from 'react-cookie';

import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {changeAuthType,changeAuth,loggeduser} from "../../actions/actions.jsx";

import {HOST} from "../../../server/defaults";

class Auth extends React.Component {
	constructor(props){
		super(props);
        this.state = {
            username: '',
            password: '',
            error: ''
        }
        console.log("in login")

	}

    onUsernameChange(e) {
        this.setState({username: e.target.value});
    }

    onPasswordChange(e) {
        this.setState({password: e.target.value});
    }

    onOk(e){
        e.preventDefault();
        this.props.history.push("/login");
        this.props.changeAuthType("AUTH_LOGIN");


    }
    onResend(){
        //this.props.history.push('/Register');
        this.props.changeAuthType("AUTH_REGISTER");


        let email=this.props.verifyEmail;
        let password=this.state.password;
        if (email=="") {
            this.setState({error: 'Please enter email'});
        }else{
            $.post(HOST+"/registeredverify", {
                    email: email,
                    name: ""
                },
                function(res){
                    console.log("verify res: "+res);
                    var auth = (res);
                    console.log(auth);
                }.bind(this)
            );            
        }
        this.props.history.replace("/login");

    }
	render () {
		return (
			<div className="verify-body">
			  <div className="auth-body">
				<div className="col-xs-12 "></div>
				<div className="auth-content col-xs-12 ">
				    <div className="auth-content-container">
				       <div className="circle-mask">
                            <img src="public/img/logowhiteclear.png"/>
                       </div>
				       <div className="acc-top">

		                        <div className="verify-text-div">
                                    Verification email sent to <span className="verify-email-span">{this.props.verifyEmail}</span> .
                                    Please check your inbox and follow the instructions to verify your account.                                  
                                </div>
		                        <span className="error-message col-xs-12">{this.state.error}</span>

			                            <button className="btn btn-login" onClick={this.onOk.bind(this)}>OK</button>

				       </div>
				       <div className="acc-bottom">
                               <div className="btn btn-register btn-url" to="#" onClick={this.onResend.bind(this)}>Resend Email</div>

				       </div>
                    </div>

				</div>
				<div className="col-xs-12 "></div>
			  </div>
			</div>
		);
	}
}

function mapStateToProps(state) {
  return({
    auth:state.auth,
    verifyEmail:state.verifyEmail
  });
}


function matchDispatchToProps(dispatch) {
    return bindActionCreators({changeAuthType:changeAuthType,changeAuth:changeAuth,loggeduser:loggeduser},dispatch);
}

export default withRouter(connect(mapStateToProps,matchDispatchToProps)(Auth));
// export default Auth;

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}
