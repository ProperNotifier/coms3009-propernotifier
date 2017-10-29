import React from 'react';
import {render} from 'react-dom';
import $ from 'jquery';
import {Link} from 'react-router-dom';

import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {platformChange} from "../../../actions/actions.jsx";
import {withRouter} from 'react-router-dom';

import {HOST} from "../../../../server/defaults";
import PDF from 'react-pdfjs';

class EditNote extends React.Component {
	constructor(props){
		super(props);
		let numPages= 1;
		let pages=[];
		for (var i = 1; i <= numPages; i++) {
			pages.push(i);
		}
        var a = window.location.toString();
        if (a.indexOf("=")<0) {
            var cat_id="";
        } else {
            var cat_id=a.substring(a.indexOf("=")+1);
        }
		this.state={
			noteid:cat_id,
			pdf:"",
			pages:pages
		}
		// this.props.platformChange("Edit Notes");
	}
	componentDidMount(){
		$(".sidebar-menu-title.active").removeClass("active");
		var self=this;
		$.post(HOST+"/getnote", {
	            //post data to the server
	            user_id:user_id,
	            book_id:self.state.noteid
	        },
	        function(response){
	        	//make use of the response here
	        	console.log(response)
	        	if(response!="error"){
	        		var note=response[0];
	        		var state={
						pdf:note.pdf
	        		}
					self.setState(state);
				}	
	        }
	    );
	}
	closeClick(){
		// var myCodeMirror = this.state.editor.getValue();
		this.props.platformChange("View Notes");
		this.props.history.goBack()

	}
	render () {
		return (  
		    <div className="read-container">
		    	{this.state.pdf.length>0 &&
		    		this.state.pages.map((page)=>{
				    	return(
				    		<div className="pdf-page">
						        <PDF
						          file={this.state.pdf}
						          page={page}
						        />
						    </div>
						)

		    		})
				}
		        <div className="editor-buttons-holder">
		    		<div onClick={this.closeClick.bind(this)} className="btn">Close</div>
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
