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
        var a = window.location.toString();
        if (a.indexOf("=")<0) {
            var cat_id="";
        } else {
            var cat_id=a.substring(a.indexOf("=")+1);
        }

		this.state={
			editor:null,
			noteid:cat_id
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
	    var user_id=this.getCookie("id");
	    $.ajax({
			url: HOST+"/uploads/"+user_id+"/"+user_id+this.state.noteid+".tex",
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
	getCookie(cname) {
	    var name = cname + "=";
	    var ca = document.cookie.split(';');
	    for(var i=0; i<ca.length; i++) {
	        var c = ca[i];
	        while (c.charAt(0)==' ') c = c.substring(1);
	        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
	    }
	    return "";
	}
	saveClick(){
		var myCodeMirror = this.state.editor.getValue();
		var user_id=this.getCookie("id");
		var texfile=user_id+""+this.state.noteid;
	    $.ajax({
			url: HOST+"/savetex",
			cache: false,
			type: "POST",
			data:{
				user_id:user_id,
				texfilename:texfile,
				tex:myCodeMirror
			},
			success: function(data,status){
				//make use of the response
				console.log("Data: " + data + "\nStatus: " + status);
			},
			error:function(argument,status) {
				// body...

				console.log(argument)
				console.log("error: " + argument.message + "\nStatus: " + status);
			}
		});

	}
	cancelClick(){
		this.props.platformChange("Notebook");
		this.props.history.goBack()
	}
	render () {
		return (  
		    <div className="editor">
		        <textarea id="latex-editor"/>
		        <div className="editor-buttons-holder">
		    		<div onClick={this.saveClick.bind(this)} className="btn">Save</div>
		    		<div onClick={this.cancelClick.bind(this)} className="btn">Cancel</div>
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
