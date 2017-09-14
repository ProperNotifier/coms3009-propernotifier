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
		$(".sidebar-menu-title.active").removeClass("active");
	}
	componentDidMount(){
		var myCodeMirror = CodeMirror.fromTextArea(document.getElementById("latex-editor"),{
			lineNumbers:true,
		    matchBrackets: true,
			mode:"stex"
		});
		// myCodeMirror.setValue(`\\document[10pt]{article}`);
		// let l=myCodeMirror.mirror.getValue();

	    /*$.get("localhost:8081/server.txt", function(data, status){
	        
	    });*/
	    $.ajax({
			url: HOST+"/stuff/practical.tex",
			cache: false,
			type: "GET",
			dataType: 'text',
			success: function(data,status){
				//make use of the response
				console.log("Data: " + data + "\nStatus: " + status);
				myCodeMirror.setValue(data);
			},
			error:function(argument,status) {
				// body...

				console.log(argument)
				console.log("error: " + argument.message + "\nStatus: " + status);
			}
		});
		this.setState({
			editor:myCodeMirror
		})

	}
	saveClick(){
		// var myCodeMirror = this.state.editor.getValue();
	}
	render () {
		return (  
		    <div className="editor">
		        <textarea id="latex-editor"/>
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
