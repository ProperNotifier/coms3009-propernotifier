import React from 'react';
import {render} from 'react-dom';
import $ from 'jquery';
import { BrowserRouter as Router,Link,Route,IndexRoute, Redirect,withRouter} from 'react-router-dom';
import cookie from 'react-cookie';

import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {changeAuth,changeAuthType,verify} from "../../actions/actions.jsx";

import {HOST} from "../../../server/defaults";

class Auth extends React.Component {
	constructor(props){
		super(props);
        this.state = {
            name: '',
            surname: '',
            organisation: '',
            occupation: '',
            email: '',
            password1: '',
            password2: '',
            errorpass: '',
            erroremail: ''
        }
        this.onRegister=this.onRegister.bind(this);

	}

    onNameChange(e) {
        this.setState({name: e.target.value});
    }
    onSurnameChange(e) {
        this.setState({surname: e.target.value});
    }
    onOrganisationChange(e) {
        this.setState({organisation: e.target.value});
    }
    onOccupationChange(e) {
        this.setState({occupation: e.target.value});
    }
    onEmailChange(e) {
        this.setState({email: e.target.value});
    }
    onPassword1Change(e) {
        this.setState({password1: e.target.value});
    }
    onPassword2Change(e) {
        this.setState({password2: e.target.value});
    }
    onPassword2Blur(e){
	    let p1 = this.state.password1;
	    let p2 = this.state.password2;
	    if (p1 != "") {
		    if (p1==p2){
		        $(".register-body .error-password").css({"display":"none"});
		        $(".register-body .password2 input").css({"box-shadow":"unset"});
		        this.setState({errorpass:"none"});
		    }else{
		        this.setState({errorpass:"Passwords do not match"});
		        $(".register-body .error-password").css({"display":"block"});
		        $(".register-body .password2 input").css({"box-shadow":"0 0 5px rgba(200, 20, 38, 0.5)"});

		    }

	    }else{
	        $(".register-body .error-password").css({"display":"none"});
	        $(".register-body .password2 input").css({"box-shadow":"unset"});
	        this.setState({errorpass:"none"});
	    }

    }
    onEmailBlur(e){
	    var x = this.state.email;
	    if (x!="") {
		    var atpos = x.indexOf("@");
		    var dotpos = x.lastIndexOf(".");
		    if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length) {
		        this.setState({erroremail:"Not a valid e-mail address"});
		        $(".register-body .error-email").css({"display":"block"});
		        $(".register-body .email input").css({"box-shadow":"0 0 5px rgba(200, 20, 38, 0.5)"});
		    }else{
		        $(".register-body .error-email").css({"display":"none"});
		        $(".register-body .email input").css({"box-shadow":"unset"});
		        this.setState({erroremail:"none"});

		    }

	    }else{
	        $(".register-body .error-email").css({"display":"none"});
	        $(".register-body .email input").css({"box-shadow":"unset"});
	        this.setState({erroremail:"none"});

	    }
    }

    onRegister(e){

    	let name=this.state.name;
    	let surname=this.state.surname;
    	let organisation=this.state.organisation;
        let occupation=this.state.occupation;
    	let email=this.state.email;
    	let password1=this.state.password1;
    	let password2=this.state.password2;
    	let erre=this.state.erroremail;
    	let errp=this.state.errorpass;

    	if ((name == "") || (surname == "") || (organisation == "") || (occupation == "") || (email == "") || (password1 == "") || (password2 == "")){
    		//console.log("no post")
    		$(".btn-login").click();
    	}else if((errp =="none") && (erre == "none")){
    		console.log("Post");
	        $.post(HOST+"/registeruser", {
	                email: email,
	                password: password1,
	                name:name,
	                surname:surname,
	                organisation:organisation,
	                occupation:occupation

	            },
	            function(res){
	            	console.log("response: "+res);
	                if (res.length>0){
						setCookie("id", res[0].id, 1);
						//window.open("index.html","_self");
			            $.post(HOST+"/registeredverify", {
			                    email: email,
			                    name: name
			                },
			                function(res){
			                    console.log("verify res: "+res);
			                    var auth = (res);
			                    console.log(auth);
						    	this.props.history.push("/verify");
			                }.bind(this)
			            ); 
	                	this.props.changeAuthType("AUTH_VERIFY");
	                	this.props.verify(email);
	                }else {
				        this.setState({erroremail:"E-mail address already in use"});
				        $(".register-body .error-email").css({"display":"block"});
				        $(".register-body .email input").css({"box-shadow":"0 0 5px rgba(200, 20, 38, 0.5)"});
	                }
	            }.bind(this)
	        );

    	}
	                	// this.props.changeAuthType("AUTH_VERIFY");
	                	//this.props.verify(email); 	


    }
	render () {
		return (
			<div className="register-body">
			  <div className="auth-body">
				<div className="col-xs-12 "></div>
				<div className="auth-content col-xs-12 ">
				    <div className="auth-content-container">
				       <div className="circle-mask">
				       		<img src="public/img/logowhiteclear.png"/>
				       </div>
				       <div className="acc-top">
		                    <form className="form-padding" >
		                    	<div className="input-group input-group-name ">
		                    		<label className="control-label " htmlFor="name">Name:</label>
		                    		<div className="name-input-container name">
				                        <input
				                            type='text'
				                            className='form-control'
				                            placeholder='Name'
				                            required
				                            onChange={this.onNameChange.bind(this)}
				                        />
		                    		</div>
		                    		<div className="name-input-container surname">
				                        <input
				                            type='text'
				                            className='form-control'
				                            placeholder='Surname'
				                            required
				                            onChange={this.onSurnameChange.bind(this)}
				                        />
		                    		</div>
		                    		<span className="error-message col-xs-12">error</span>
			                    </div>

		                    	<div className="input-group organisation">
		                    		<label className="control-label" htmlFor="organisation">Organisation:</label>
			                        <input
			                            type='text'
			                            className='form-control'
			                            placeholder=''
			                            required
			                            onChange={this.onOrganisationChange.bind(this)}
			                        />
			                        <span className="error-message error-organisation col-xs-12">error</span>
		                        </div>

                                        <div className="input-group occupation">
                                                <label className="control-label" htmlFor="occupation">Occupation:</label>
                                                <input
                                                    type='text'
                                                    className='form-control'
                                                    placeholder=''
                                                    required
                                                    onChange={this.onOccupationChange.bind(this)}
                                                />
                                                <span className="error-message error-occupation col-xs-12">error</span>
                                        </div>

		                    	<div className="input-group email">
		                    		<label className="control-label" htmlFor="email">Email:</label>
			                        <input
			                            type='text'
			                            className='form-control'
			                            required
			                            onChange={this.onEmailChange.bind(this)}
			                            onBlur={this.onEmailBlur.bind(this)}
			                        />
			                        <span className="error-message error-email col-xs-12">{this.state.erroremail}</span>
		                        </div>


		                    	<div className="input-group password1">
		                    		<label className="control-label" htmlFor="password">Create password:</label>
			                        <input
			                            type='password'
			                            className='form-control'
			                            required
			                            onChange={this.onPassword1Change.bind(this)}
			                        />
		                        </div>

		                    	<div className="input-group password2">
		                    		<label className="control-label" htmlFor="password">Confirm password:</label>
			                        <input
			                            type='password'
			                            className='form-control'
			                            required
			                            onBlur={this.onPassword2Blur.bind(this)}
			                            onChange={this.onPassword2Change.bind(this)}
			                        />
			                        <span className="error-message error-password col-xs-12">{this.state.errorpass}</span>
		                        </div>


			                            <button className="btn btn-login" style={{"display":"none"}} onClick={this.onRegister.bind(this)}>Login</button>

		                    </form>
				       </div>
				       <div className="acc-bottom">
                        	   <div className="btn btn-register btn-url" to="#" onClick={this.onRegister}>Verify Account</div>

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
    return bindActionCreators({changeAuthType:changeAuthType,changeAuth:changeAuth,verify:verify},dispatch);
}

export default (connect(mapStateToProps,matchDispatchToProps)(Auth));

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}
