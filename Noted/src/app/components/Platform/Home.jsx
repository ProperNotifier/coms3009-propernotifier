import React from 'react';
import {render} from 'react-dom';
// import $ from 'jquery';

import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {platformChange} from "../../actions/actions.jsx";

import NotesPreview from "./utilities/NotesPreview.jsx";

class Home extends React.Component {
	constructor(props){
		super(props);
		
	}
	componentDidMount(){
		
	}
	render () {
		return (  
		    <div>         
                   <div className="recent-ad-activity col-md-7 col-xs-12">
                   	Display downloaded+my notebook
                   
                   </div> 
                   <div className="recent-ad-activity col-md-5 col-xs-12">

                   </div>
                   <div className="recent-ad-activity col-md-12 col-xs-12">
		        <NotesPreview mode="view"/>
		        <NotesPreview mode="view"/>
		        <NotesPreview mode="view"/>


                   </div>
                   <div className="col-md-12 col-xs-12" ></div>
                   <div className="col-md-12 col-xs-12" ></div>
            </div>
	    );
	}
}

function mapStateToProps(state) {
	return({
		user:state.user,
		platform:state.onPlatform
		
	});
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators({platformChange:platformChange},dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(Home);