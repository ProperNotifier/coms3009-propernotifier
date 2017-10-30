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
			noteid:cat_id,
			title:"",
			price:"",
			description:""
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
		var self=this;
		$.post(HOST+"/getbook", {
	            //post data to the server
	            //user_id:user_id,
	            book_id:this.state.noteid
	        },
	        function(response){
	        	//make use of the response here
	        	console.log(response)
	        	if(response!="error"){
	        		var note=response[0];
	        		var state={
						title:note.title,
						price:note.price,
						description:note.description
	        		}
					self.setState(state);
				}	
	        }
	    );
	    var user_id=this.getCookie("id");
	    $.ajax({
			url: HOST+"/uploads/"+user_id+"/"+user_id+this.state.noteid+".tex",
			cache: false,
			type: "GET",
			dataType: 'text',
			success: function(data,status){
				//make use of the response
				console.log("Retrived latex");
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
    handleTitle(e) {
        this.setState({title: e.target.value});
    }
    handlePrice(e) {
        this.setState({price: e.target.value});
    }
    handleDescription(e) {
        this.setState({description: e.target.value});
    }
	saveClick(){
		var myCodeMirror = this.state.editor.getValue();
		var user_id=this.getCookie("id");
		var texfile=user_id+""+this.state.noteid;
		var self=this;
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
				console.log("Save latex");
				$.post(HOST+"/savebook", {
			            //post data to the server
			            //user_id:user_id,
			            book_id:self.state.noteid,
						title:self.state.title,
						price:self.state.price,
						description:self.state.description
			        },
			        function(response){
			        	//make use of the response here
			        	console.log(response)
			        	self.cancelClick()
			        	/*if(response!="error"){
			        		var note=response[0];
			        		var state={
								title:note.title,
								price:note.price,
								description:note.description
			        		}
							self.setState(state);
						}*/	
			        }
			    );
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
	deleteClick(){
		$.post(HOST+"/deletebook", {
	            //post data to the server
	            //user_id:user_id,
	            book_id:this.state.noteid
	        },
	        function(response){
	        	//make use of the response here
	        	console.log(response)
				this.props.platformChange("Notebook");
				this.props.history.goBack()	
	        }
	    );
	}
	render () {
		return ( 
			<div className="edit-note-container"> 
			        	<div className="col-md-12 col-xs-12">
			        		<div className="detail-line">			        		
			        			<label className="col-xs-12 col-md-2">Title:</label>
			        			<div className="col-xs-12 col-md-10">
				        			<input onChange={this.handleTitle.bind(this)} value={this.state.title}/>
			        			</div>
			        		</div>
			        		<div className="detail-line">			        		
			        			<label className="col-xs-12 col-md-2">Price:</label>
			        			<div className="col-xs-12 col-md-10">
				        			<input onChange={this.handlePrice.bind(this)} value={this.state.price}/>
			        			</div>
			        		</div>
			        		<div className="detail-line">
			        			<label className="col-xs-12 col-md-2">Description:</label>
			        			<div className="col-xs-12 col-md-10">
					        		<textarea onChange={this.handleDescription.bind(this)} value={this.state.description} ></textarea>
				        		</div>
				        	</div>
			        	</div>
			    <div className="editor">
			        <textarea id="latex-editor"/>
			        <div className="editor-buttons-holder">
			    		<div onClick={this.deleteClick.bind(this)} style={{backgroundColor:"red"}} className="btn">Delete</div>
			    		<div onClick={this.saveClick.bind(this)} className="btn">Save</div>
			    		<div onClick={this.cancelClick.bind(this)} className="btn">Cancel</div>
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
