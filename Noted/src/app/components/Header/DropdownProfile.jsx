import React from 'react';
import {render} from 'react-dom';
import { BrowserRouter as Router,Link,Route,IndexRoute, browserHistory, hashHistory,Redirect} from 'react-router-dom';
import cookie from 'react-cookie';

import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {changeAuthType} from "../../actions/actions.jsx";
import {changeAuth} from "../../actions/actions.jsx";


class DropdownProfile extends React.Component {
	constructor(props){
		super(props);

	}
    onSignOut(){
        // cookie.remove('avo_user', { path: '/' });

        var cookies = document.cookie.split(";");

        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
        this.props.changeAuth("USER_AUTH");
        window.open("login.html","_self");
    }
	render () {
		return (
            <ul className="dropdown-menu header-dropdown-menu" style={{"marginTop": "10px"}}>

                <li className="user-header bg-light-blue">
                    <img src="public/img/profile.png" className="img-circle" alt="User Image" />
                    <p>
                        {this.props.user.name} {this.props.user.surname} <br/> {this.props.user.organisation}
                        <small>Member since Nov. 2012</small>
                    </p>
                </li>
                <li className="user-footer">
                    <div className="pull-left">
                        <a className="btn btn-default btn-flat">Profile</a>
                    </div>
                    <div className="pull-right">
                        <a className="btn btn-default btn-flat" onClick={()=>this.onSignOut()}>Sign out</a>
                    </div>
                </li>
            </ul>
		);
	}
}

function mapStateToProps(state) {
  return({
    user:state.user    
  });
}


function matchDispatchToProps(dispatch) {
    return bindActionCreators({changeAuthType:changeAuthType,changeAuth:changeAuth},dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(DropdownProfile);
