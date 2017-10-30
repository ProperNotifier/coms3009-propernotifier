import React from 'react';
import {render} from 'react-dom';
import $ from 'jquery';

import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {platformChange} from "../../actions/actions.jsx";
import UploadTags from "./utilities/UploadTags.jsx"

class Profile extends React.Component {
	constructor(props){
		super(props);
		this.state={
			name:"",
			surname:"",
			occupation:"",
			organisation:"",

		}
	}
	handleName(e){
		this.setState({name:e.target.value})
	}
	handleSurname(e){
		this.setState({surname:e.target.value})
	}
	handleOccupation(e){
		this.setState({occupation:e.target.value})
	}
	handleOrganisation(e){
		this.setState({organisation:e.target.value})
	}
	render () {
		return (  
		    <div className="profile">
			    <div className="container col-xs-12">
		                    <div className="image col-xs-4">
		                        <img src={this.props.user.image} className="img-circle" alt="User Image" />
		                    </div>

			        		<div className="detail-line">			        		
			        			<label className="col-xs-12 col-md-2">Name:</label>
			        			<input onChange={this.handleName.bind(this)} value={this.state.name}/>
			        		</div>
			        		<div className="detail-line">			        		
			        			<label className="col-xs-12 col-md-2">Surname:</label>
			        			<input onChange={this.handleSurname.bind(this)} value={this.state.surname}/>
			        		</div>
			        		<div className="detail-line">
			        			<label className="col-xs-12 col-md-2">Organisation:</label>
				        		<input onChange={this.handleOrganisation.bind(this)} value={this.state.organisation} ></input>
				        	</div>
			        		<div className="detail-line">
			        			<label className="col-xs-12 col-md-2">Occupation:</label>
				        		<input onChange={this.handleOccupation.bind(this)} value={this.state.occupation} ></input>
				        	</div>
			        		<div className="detail-line">
			        			<label>Interests:</label>
			        			<UploadTags/>
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

export default connect(mapStateToProps,matchDispatchToProps)(Profile);