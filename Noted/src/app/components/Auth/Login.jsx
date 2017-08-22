import React from 'react';
import {render} from 'react-dom';
import { BrowserRouter as Router,Link,Route,IndexRoute, browserHistory, hashHistory,Redirect,withRouter} from 'react-router-dom';
import cookie from 'react-cookie';

import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {changeAuthType,changeAuth,loggeduser} from "../../actions/actions.jsx";


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

    onLogin(e){
        e.preventDefault();

    	/*let email=this.state.username;
    	let password=this.state.password;
        console.log(email);
        console.log(password);
        $.post("http://localhost/AvoFeed/backend/api/login.php", {
                email: email,
                password: password
            },
            function(res){
                var auth = JSON.parse(res)[0];
                console.log("login res: "+res);
                console.log(auth);
                if (auth == null){
                    this.setState({error: 'incorrect username/password'});
                    this.setState({password: ''});
                }else {
                    cookie.save('avo_user', auth.id, { path: '/' });
                    this.props.loggeduser("USER_LOGGING_IN",auth);
                    this.props.changeAuth("USER_LOGGED");
                    //cookie.save('userName', auth.username, { path: '/' });
                    /*const location = this.props.location
                    if (location.state && location.state.nextPathname) {
                      browserHistory.push(location.state.nextPathname)
                    } else {
                      browserHistory.push('/')
                    }
                }
            }.bind(this)
        ); */
        this.props.history.push('/');
        this.props.changeAuth("LoggedIn");
				setCookie("id", "1", 1);
				window.open("index.html","_self");//***for mock


    }
    onRegister(){
        //this.props.history.push('/Register');
        this.props.changeAuthType("AUTH_REGISTER");

    }
	render () {
        console.log("rendering")
		return (
			<div className="login-body">
			  <div className="auth-body">
				<div className="col-xs-12 "></div>
				<div className="auth-content col-xs-12 ">
				    <div className="auth-content-container">
				       <div className="circle-mask">
                            <img src="public/img/logowhiteclear.png"/>
                       </div>
				       <div className="acc-top">
		                    <form className="form-padding" >

		                        <input
		                            type='text'
		                            className='form-control'
		                            placeholder='Email or Username'
		                            required
		                            onChange={this.onUsernameChange.bind(this)}
		                        />

		                        <input
		                            type='password'
		                            className='form-control'
		                            placeholder='Password'
		                            required
		                            onChange={this.onPasswordChange.bind(this)}
		                        />
		                        <span className="error-message col-xs-12">{this.state.error}</span>

			                            <button className="btn btn-login" onClick={this.onLogin.bind(this)}>Login</button>

		                    </form>
				       </div>
				       <div className="acc-bottom">
                        	   <div className="btn btn-register btn-url" to="#" onClick={this.onRegister.bind(this)}>Create an Account</div>

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
