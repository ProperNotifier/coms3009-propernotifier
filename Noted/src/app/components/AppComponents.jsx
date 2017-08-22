import React from 'react';
import {render} from 'react-dom';
import cookie from "react-cookie"
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {platformChange, changeAuth} from "../actions/actions.jsx";

import Header from './Header.jsx';
import SideBar from './SideBar.jsx';
import Platform from './Platform.jsx';
import AuthBody from './Auth.jsx';



class AllComponents extends React.Component {
	constructor(props){
	    super(props);
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
	return bindActionCreators({platformChange:platformChange},dispatch);
}

export default /*connect(mapStateToProps,matchDispatchToProps)*/(AllComponents);