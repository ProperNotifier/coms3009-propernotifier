import React from 'react';
import {render} from 'react-dom';
import { BrowserRouter as Router,Link,Route,IndexRoute, browserHistory, hashHistory,Redirect,withRouter} from 'react-router-dom';
import cookie from 'react-cookie';
import $ from 'jquery';

import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {changeAuthType,changeAuth,loggeduser} from "../../actions/actions.jsx";

import {HOST} from "../../../server/defaults";

class Auth extends React.Component {
	constructor(props){
		super(props);
        var a = window.location.toString();
        if (a.indexOf("=")<0) {
            var cat_id="";
        } else {
            var cat_id=a.substring(a.indexOf("=")+1);
        }
        this.state = {
            email: cat_id
        }
        console.log("in login")
	}
    componentWillMount(){
        let email=this.state.email;
        if (email=="") {
            this.props.history.replace("/login");
        } else {
            $.post(HOST+"/verifyme", {
                    email: email,
                },
                function(res){
                    //response from server
                    console.log(res)
                }
            );
            this.props.history.replace("/verifiedaccount");
        }
    }
    onLogin(){
        //this.props.history.push('/Register');
        this.props.history.replace("/login");
        this.props.changeAuthType("AUTH_LOGIN");

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
                                    Account Verified ✔. <br/>
                                    Welcome to our network<br/>
                                    Please sign in
                                </div>

			                            <button className="btn btn-login" onClick={this.onLogin.bind(this)}>Login</button>

				       </div>
				       <div className="acc-bottom">

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
    auth:state.auth
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
