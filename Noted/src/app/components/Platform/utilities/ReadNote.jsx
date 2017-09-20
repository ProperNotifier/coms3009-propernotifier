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
		let numPages= 12;
		let pages=[];
		for (var i = 1; i <= numPages; i++) {
			pages.push(i);
		}
		this.state={
			pdf:HOST+"/pdf",
			pages:pages
		}
		// this.props.platformChange("Edit Notes");
	}
	componentDidMount(){
		$(".sidebar-menu-title.active").removeClass("active");
	    /*let HOST="http://localhost:8081";
	    let self=this;
	    $.ajax({
			url: HOST+"/pdf",
			cache: false,
			type: "GET",
			dataType: 'text',
			success: function(data,status){
				//make use of the response
				//console.log("Data: " + data + "\nStatus: " + status);
				// myCodeMirror.setValue(data);
				console.log("PDF GOT")
				self.setState({
					pdf:data
				})

			},
			error:function(argument,status) {
				// body...

				console.log(argument)
				console.log("error: " + argument.message + "\nStatus: " + status);
			}
		});*/
	}
	saveClick(){
		// var myCodeMirror = this.state.editor.getValue();
	}
	render () {
		return (  
		    <div className="read-container">
		    	{
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
		    		<div onClick={this.saveClick.bind(this)} className="btn">Save</div>
		    		<div className="btn">Cancel</div>
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
