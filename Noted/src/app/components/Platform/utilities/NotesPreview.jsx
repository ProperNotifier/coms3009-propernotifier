import React from 'react';
import {render} from 'react-dom';
// import $ from 'jquery';
import Ratings from "./Rating.jsx";

import {BrowserRouter as Router,Link,browserHistory} from 'react-router-dom';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {platformChange} from "../../../actions/actions.jsx";

class NotesPreview extends React.Component {
	constructor(props){
		super(props);
		this.state={
			noteid:this.props.id,
			tags:[]//["abstract","mathematics","groups"]
		}
	} 
	render () {
		let mode="";
		this.props.mode=="edit"?(mode="/EditNotes?="):(mode="/ViewNotes?=")
		return (  
		    <Link to={"/ViewNotes?="+this.state.noteid} onClick={()=>this.props.platformChange("View Notes")} className="notes-item col-xs-6 col-sm-4 col-md-3">
				<div className="notes-overlay">
				    <img className="img-back" src="public/img/pdf.png"/>
				    {this.props.mode=="edit"?<Link onClick={()=>this.props.platformChange("Edit Notes")} to={"/EditNotes?="+this.state.noteid} className="edit-button"><div className="btn">Edit</div></Link>:""}
		    		<div className="notes-details-container">
			    		<div className=" col-md-12 notes-details" style={{"color": "white"}}>
			    			<h1 className="col-md-12 notes-name">{this.props.name}</h1>
			    			<p> Date: {this.props.date}</p>
			    			<p> R{this.props.price}</p>

			    			<Ratings id={this.state.noteid} rating={this.props.rating} mode="display"/>

			    			<h3 style={{'textTransform':"capitalize"}}>{this.props.author}</h3>
			    		</div>
			    		
			    		<div className="notes-tags">
			    			{
			    				this.state.tags.map((tag,index)=>{
			    					return(<span key={index}>{tag}</span>)
			    				})
			    			}			    			
			    		</div>
		    		</div>
				</div>		    
            </Link>
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

export default connect(mapStateToProps,matchDispatchToProps)(NotesPreview);