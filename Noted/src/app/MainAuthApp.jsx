import React from 'react';
import {render} from 'react-dom';

import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {changeAuth, loggeduser} from "./actions/actions.jsx";
import cookie from 'react-cookie';

import AppComponents from './components/AppComponents.jsx';
import AuthBody from './components/Auth.jsx';

import {Redirect,Switch,Route,withRouter} from 'react-router-dom';


class MainApp extends React.Component {
	constructor(props){
		super(props);

	}
	render () {
		return (
		    <div>
					<AuthBody/>
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
	return bindActionCreators({changeAuth:changeAuth,loggeduser:loggeduser},dispatch);
}

export default withRouter(connect(mapStateToProps,matchDispatchToProps)(MainApp));
