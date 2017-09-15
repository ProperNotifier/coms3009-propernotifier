import React from 'react';
import {render} from 'react-dom';
import $ from 'jquery';
import {Link} from 'react-router-dom';

import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {platformChange} from "../../../actions/actions.jsx";
import {withRouter} from 'react-router-dom';

import {HOST} from "../../../../server/defaults";

class EditNote extends React.Component {
	constructor(props){
		super(props);
		this.state={
			editor:null
		}
		// this.props.platformChange("Edit Notes");
		// $(".sidebar-menu-title.active").removeClass("active");
	}
	componentDidMount(){

	}
	saveClick(){
		// var myCodeMirror = this.state.editor.getValue();
	}
	render () {
		return (  
			<div className="upload-container">
			    <div className="upload-container-elements">
			    	<div className="top-line">
			    		<div className="close-btn fa fa-close"></div>
			    	</div>
			        <div className="bottom-holder">
			        	<div className="col-md-5 col-xs-12">
			        		<div className="detail-line">			        		
			        			<label>Title:</label>
			        			<input/>
			        		</div>
			        		<div className="detail-line">			        		
			        			<label>Price:</label>
			        			<input/>
			        		</div>
			        		<div className="detail-line">
			        			<label>Description:</label>
				        		<textarea></textarea>
				        	</div>
			        		<div className="detail-line">
			        			<label>Tags:</label>
			        			<div className="tags-holder">
					    			<span>abstract</span>
					    			<span>mathematics</span>
					    			<span>science</span>
					    			<span>groups</span>
					    			<span>economics</span>
					    			<span>music</span>
					    			<span>accounting</span>
					    			<span>finance</span>
					    			<span>corporate</span>
					    			<span>literature</span>
					    			<span>computer</span>
					    			<span>code</span>
			        			</div>
				        	</div>
			        	</div>
			        	<div className="col-md-1">
			        	</div>
			        	<div className="col-md-6 col-xs-12">
			        		<div className="picture-list"></div>
			        		<div className="add-picture fa fa-plus-circle"></div>
			        		<div className="btn upload-btn">Upload</div>			        	
			        	</div>
			        </div>

	            </div>
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

export default withRouter(connect(mapStateToProps,matchDispatchToProps)(EditNote));
